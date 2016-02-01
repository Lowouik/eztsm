class NodesController < ApplicationController

  def index
    @node_name = params[:node_name]
    @filter = @node_name.upcase.gsub(/\*/i, '%').gsub(/[^0-9A-Z\-\.%]/i, '')
    @columns = [ 'node_name', 'platform_name', 'domain_name', 'option_set', 'timestamp(lastacc_time, 0)']
    @select = tsmdb_select(@columns, 'nodes', "node_name like \'%#{@filter}%\'")
    @nodes = @select['output'].split(/\n/)
  end

  def view
    node_name = params[:node_name] 
    columns = ['NODE_NAME','DOMAIN_NAME','OPTION_SET','PLATFORM_NAME','TCP_NAME','TCP_ADDRESS','MAX_MP_ALLOWED','ARCHDELETE','BACKDELETE','LOCKED','LASTACC_TIME','LASTSESS_COMMMETH','LASTSESS_RECVD','LASTSESS_SENT','LASTSESS_DURATION','LASTSESS_IDLEWAIT','LASTSESS_COMMWAIT','LASTSESS_MEDIAWAIT']
    select = tsmdb_select(columns, 'nodes', "node_name = '#{node_name}'")
    
    result_csv = CSV.new(columns.join(',') + "\n" + select['output'], :headers => true, :header_converters => :symbol, :converters => :all)
    result_json = result_csv.to_a.map {|row| row.to_hash }
    puts result_json

    respond_to do |format|
      format.json { render :json => result_json }
    end
  end
end
