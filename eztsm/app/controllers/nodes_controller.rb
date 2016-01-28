class NodesController < ApplicationController

  def index
    if Setting.local_tsm
      @nodes = `ls` 
    else
#      @nodes = `ssh -p #{Setting.ssh_port} #{Setting.ssh_user}@#{Setting.tsm_address} ls`
      @nodes = `echo ssh -p #{Setting.ssh_port} #{Setting.ssh_user}@#{Setting.tsm_address} ls`
      puts @nodes
      render :nothing => true
    end
  end
end
