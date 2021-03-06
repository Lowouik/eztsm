class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :must_be_logged_in_and_app_initialized
  helper_method :current_user

  private
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def must_be_logged_in_and_app_initialized
    if current_user
      unless Setting.initialized_on or params[:controller] == "rails_settings_ui/settings"
        flash[:info] = "First things first. Please take a minute to configure ezTSM."
        redirect_to admin_settings_path
      end
    else
      redirect_to login_path
    end
  end

  # Launch a given command on the tsm server
  # Returns an Hash containing:
  # exit_status => the exit status of the command
  # output => the output
  def tsm_exec(cmd)
    tsm_exec = Hash.new
    if Setting.local_tsm
      tsm_exec['output'] = `#{cmd}`
      tsm_exec['exit_status'] = $?.exitstatus
    else
      tsm_exec['output'] = `ssh -p #{Setting.ssh_port} #{Setting.ssh_user}@#{Setting.tsm_address} "#{cmd}"`
      tsm_exec['exit_status'] = $?.exitstatus
    end
    tsm_exec
  end

  # Launch a given command directly to TSM server using qtsm (provided by eztsm-plugins)
  # Returns an Hash containing:
  # exit_status => the exit status of the command
  # output => the output
  def qtsm(cmd)
    log_event("Command executed: #{cmd}")
    tsm_exec('bin/qtsm \\" ' + cmd + '\\"')
  end

  # Execute a select query on TSM database
  def tsmdb_select(columns, table, where_clauses = nil)
    select_statement = 'bin/qtsmc \\"select ' + columns.join(', ') + " from #{table}"
    if where_clauses.nil?
      select_statement += '\\"'
    else
      select_statement += ' where ' + where_clauses + '\\"'
    end
    tsm_exec select_statement
  end

  # Sanitize a string provided by user before it can be given to TSM
  def sanitize_for_tsm(input_string)
    input_string.gsub(/\*/i, '%').gsub(/[^0-9A-Za-z\-\._%]/i, '')
  end

  def log_event(desc)
    @current_user.events.create(timestamp: Time.now, details: desc)
  end
end
