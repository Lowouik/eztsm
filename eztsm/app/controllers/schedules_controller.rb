class SchedulesController < ApplicationController
  def index
    if params[:domain_name]
      @domain_name = params[:domain_name]
    else
      @domain_name = ''
    end
    @filter = sanitize_for_tsm(@domain_name).upcase
    @columns = ['schedule_name','starttime','duration','durunits','dayofweek']
    @select = tsmdb_select(@columns, 'client_schedules', "domain_name like \'%#{@filter}%\'")
    @nodes = @select['output'].split(/\n/)
    result_json = Hash.new

    result_csv = CSV.new(@columns.join(',') + "\n" + @select['output'], :headers => true, :header_converters => :symbol, :converters => :all)
    result_json['schedules'] = result_csv.to_a.map {|row| row.to_hash }
    result_json['exit_status'] = @select['exit_status']

    respond_to do |format|
      format.json { render :json => result_json.to_json }
    end
  end

  def list_by_node
    if params[:node_name]
      @node_name = params[:node_name]
    else
      @node_name = ''
    end

    @filter = sanitize_for_tsm(@node_name).upcase
    @columns = ['schedule_name']
    @select = tsmdb_select(@columns, 'associations', "node_name like \'%#{@filter}%\'")
    @nodes = @select['output'].split(/\n/)
    result_json = Hash.new

    result_csv = CSV.new(@columns.join(',') + "\n" + @select['output'], :headers => true, :header_converters => :symbol, :converters => :all)
    result_json['schedules'] = result_csv.to_a.map {|row| row.to_hash }
    result_json['exit_status'] = @select['exit_status']

    respond_to do |format|
      format.json { render :json => result_json.to_json }
    end

  end

  def update
    unless params[:node_name].nil? or params[:domain_name].nil? or params[:schedule_name].nil? or params[:association].nil?
      node_name = sanitize_for_tsm(params[:node_name]).upcase
      domain_name = sanitize_for_tsm(params[:domain_name]).upcase
      schedule_name = sanitize_for_tsm(params[:schedule_name]).upcase

      if params[:association] == 'true'
        result = qtsm("define association #{domain_name} #{schedule_name} #{node_name}")
      else
        result = qtsm("delete association #{domain_name} #{schedule_name} #{node_name}")
      end

      respond_to do |format|
        format.json { render :json => result.to_json }
      end
    end
  end
end

