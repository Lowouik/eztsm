class ReportsController < ApplicationController

  def get_top_50
    @result = tsm_exec('bin/getTop50nodes_EZTSM')
    @nodes = @result['output'].split(/\n/)
    @columns = @nodes.first
    @nodes.shift
  end

  def nodes_without_schedules
    @result = tsm_exec('bin/nodeWithoutSchedule_EZTSM')
    @nodes = @result['output'].split(/\n/)
    @columns = @nodes.first
    @nodes.shift
  end

  def last_7_days_activity
    @result = tsm_exec('bin/tsm7daysstats_EZTSM')
  end

  def stgpools_index
    @result = tsmdb_select(['stgpool_name'], 'stgpools')
    @stgpools = @result['output'].split(/\n/)
  end

  def show_stgpool
    if params[:stgpool_name].nil?
      stgpool_name = 'ALL'
    else
      stgpool_name = params[:stgpool_name]
    end

    @result = tsm_exec("bin/stgpoolStatus_EZTSM #{stgpool_name}")

  end

end
