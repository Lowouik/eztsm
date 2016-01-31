class NodesController < ApplicationController

  def index
    @node_name = params[:node_name]
    @filter = @node_name.upcase.gsub(/\*/i, '%').gsub(/[^0-9A-Z\-\.%]/i, '')
    @columns = [ 'node_name', 'platform_name', 'domain_name', 'option_set', 'timestamp(lastacc_time, 0)']
    @select = tsmdb_select(@columns, 'nodes', "node_name like \'%#{@filter}%\'")
    @nodes = @select['output'].split(/\n/)
  end
end
