class NodesController < ApplicationController

  def index
    @node_name = params[:node_name]
    @filter = @node_name.upcase.gsub(/[^0-9A-Z\-\.]/i, '')
    @columns = [ 'node_name', 'platform_name', 'domain_name', 'option_set', 'lastacc_time']
    @select = tsmdb_select(@columns, 'nodes', "node_name like \'%#{@filter}%\'")
    @nodes = @select['output'].split(/\n/)
  end
end
