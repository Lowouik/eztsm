class NodesController < ApplicationController

  def index
    @node_name = params[:node_name]
    @filter = sanitize_for_tsm(@node_name).upcase
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

    respond_to do |format|
      format.json { render :json => result_json }
    end
  end

  def rename
    result = qtsm("rename node #{sanitize_for_tsm(params[:current_name])} #{sanitize_for_tsm(params[:new_name]).upcase}")
    puts result
    puts result.to_json
    respond_to do |format|
      format.json { render :json => result.to_json } 
    end
  end

end
