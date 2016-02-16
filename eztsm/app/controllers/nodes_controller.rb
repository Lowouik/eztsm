class NodesController < ApplicationController

  def index
    if params[:node_name]
      @node_name = params[:node_name]
    else
      @node_name = ''
    end
    @filter = sanitize_for_tsm(@node_name).upcase
    @columns = [ 'node_name', 'tcp_address', 'domain_name', 'option_set', 'timestamp(lastacc_time, 0)']
    @select = tsmdb_select(@columns, 'nodes', "node_name like \'%#{@filter}%\'")
    @nodes = @select['output'].split(/\n/)
  end

  def view
    node_name = sanitize_for_tsm(params[:node_name])
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
    respond_to do |format|
      format.json { render :json => result.to_json } 
    end
  end

  def update
    node_name = sanitize_for_tsm(params[:node_name])
    result = Hash.new
    result['output'] = 'No matching parameters' #Error message if no available parameters where given
 
    # Update password
    if params[:password]
      password = params[:password]
      
      # Check password length is more than 7 characters
      if password.length > 7
        # Accept only alphanumerical passwords
        if password =~ /\A[[:alnum:]]+\z/
          result = qtsm("update node #{node_name} #{password}")
        else
          result['exit_status'] = -1
          result['output'] = "Password should be alphanumeric only"
        end
      else
        result['exit_status'] = -1
        result['output'] = "Node's password should be at least 8 characters long."
      end
    end

    # Update domain
    if params[:domain]
      domain = sanitize_for_tsm(params[:domain])
      result = qtsm("update node #{node_name} domain=#{domain}")
    end

    # Update option set
    if params[:option_set]
      option_set = sanitize_for_tsm(params[:option_set])
      result = qtsm("update node #{node_name} cloptset=#{option_set}")
    end

    # Update max mp allowed
    if params[:max_mp_allowed]
      max_mp_allowed = sanitize_for_tsm(params[:max_mp_allowed])
      result = qtsm("update node #{node_name} maxnummp=#{max_mp_allowed}")
    end

    unless params[:backdelete].nil?
      if params[:backdelete] == 'true'
        result = qtsm("update node #{node_name} backdelete=yes")
      elsif params[:backdelete] == 'false'
        result = qtsm("update node #{node_name} backdelete=no")
      end
    end

    respond_to do |format|
      format.json { render :json => result.to_json }
    end
  end

  def delete
    if params[:node_name]
      result = qtsm("update node #{params[:node_name]} domain='RETIREDNODES'")
      if result['exit_status'] == 0
        flash[:success] = "Node successfully switched to 'RETIREDNODES' domain"
      else
        flash[:danger] = "Unable to delete node #{params[:node_name]}. Error details: #{result['output']}"
      end
    else
      flash[:danger] = "You must supply a node name to delete"
    end
    redirect_to nodes_url(node_name: params[:search])
  end

  def create
    unless params[:node][:node_name].nil? or params[:node][:password].nil? or params[:node][:domain_name].nil? or params[:node][:opt_set].nil?
      @node_name = sanitize_for_tsm(params[:node][:node_name])
      password = sanitize_for_tsm(params[:node][:password])
      domain_name = sanitize_for_tsm(params[:node][:domain_name])
      opt_set = sanitize_for_tsm(params[:node][:opt_set])
      
      if password.length < 8
        @result = Hash.new
        @result['exit_status'] = -1
        @error_message = "Node's password should be at least 8 characters long."
      else
        @result = qtsm("register node #{@node_name} #{password} domain=#{domain_name} cloptset=#{opt_set}")
    
        if @result['exit_status'] == 0
          flash[:success] = "Node #{@node_name} successfully created"
        else
          @error_message = "Unable to create node #{@node_name}. Error details: #{@result['output']}"
        end
      end
    end
    render 'nodes/create_node_modal_response' 
  end
end
