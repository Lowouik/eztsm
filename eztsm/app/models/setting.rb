# RailsSettings Model
class Setting < RailsSettings::CachedSettings
  defaults[:local_tsm] = true
  defaults[:tsm_address] = ''
  defaults[:ssh_port] = '22'
  defaults[:ssh_user] = ''
end
