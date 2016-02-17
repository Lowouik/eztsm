class ReportsController < ApplicationController

  def get_top_50
    @result = tsm_exec('/opt/expl/tsm/getTop50nodes_EZTSM')
    @nodes = @result['output'].split(/\n/)
    @columns = @nodes.first
    @nodes.shift
  end

  def nodes_without_schedules
    @result = tsm_exec('/opt/expl/tsm/nodeWithoutSchedule_EZTSM')
    @nodes = @result['output'].split(/\n/)
    @columns = @nodes.first
    @nodes.shift
  end

end
