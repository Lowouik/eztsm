# -*- encoding: utf-8 -*-
# stub: client_side_validations 4.2.1 ruby lib

Gem::Specification.new do |s|
  s.name = "client_side_validations"
  s.version = "4.2.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Brian Cardarella"]
  s.date = "2016-01-15"
  s.description = "Client Side Validations made easy for your Rails 4 applications"
  s.email = ["bcardarella@gmail.com"]
  s.homepage = "https://github.com/DavyJonesLocker/client_side_validations"
  s.licenses = ["MIT"]
  s.rubygems_version = "2.5.1"
  s.summary = "Client Side Validations"

  s.installed_by_version = "2.5.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<rails>, ["< 4.3.0", ">= 4.0.0"])
      s.add_runtime_dependency(%q<jquery-rails>, ["< 5.0.0", ">= 3.1.2"])
      s.add_runtime_dependency(%q<js_regex>, [">= 1.0.9", "~> 1.0"])
      s.add_development_dependency(%q<appraisal>, ["~> 2.1"])
      s.add_development_dependency(%q<coveralls>, ["~> 0.8.10"])
      s.add_development_dependency(%q<m>, ["~> 1.4"])
      s.add_development_dependency(%q<minitest>, ["< 6.0.0", ">= 4.7.5"])
      s.add_development_dependency(%q<mocha>, ["~> 1.1"])
      s.add_development_dependency(%q<rubocop>, ["~> 0.36.0"])
      s.add_development_dependency(%q<simplecov>, ["~> 0.11.1"])
      s.add_development_dependency(%q<sqlite3>, ["~> 1.3"])
      s.add_development_dependency(%q<byebug>, ["~> 8.2"])
      s.add_development_dependency(%q<sinatra>, ["~> 1.4"])
      s.add_development_dependency(%q<shotgun>, ["~> 0.9.1"])
      s.add_development_dependency(%q<thin>, ["~> 1.6"])
      s.add_development_dependency(%q<json>, ["~> 1.8"])
      s.add_development_dependency(%q<coffee-script>, ["~> 2.4"])
    else
      s.add_dependency(%q<rails>, ["< 4.3.0", ">= 4.0.0"])
      s.add_dependency(%q<jquery-rails>, ["< 5.0.0", ">= 3.1.2"])
      s.add_dependency(%q<js_regex>, [">= 1.0.9", "~> 1.0"])
      s.add_dependency(%q<appraisal>, ["~> 2.1"])
      s.add_dependency(%q<coveralls>, ["~> 0.8.10"])
      s.add_dependency(%q<m>, ["~> 1.4"])
      s.add_dependency(%q<minitest>, ["< 6.0.0", ">= 4.7.5"])
      s.add_dependency(%q<mocha>, ["~> 1.1"])
      s.add_dependency(%q<rubocop>, ["~> 0.36.0"])
      s.add_dependency(%q<simplecov>, ["~> 0.11.1"])
      s.add_dependency(%q<sqlite3>, ["~> 1.3"])
      s.add_dependency(%q<byebug>, ["~> 8.2"])
      s.add_dependency(%q<sinatra>, ["~> 1.4"])
      s.add_dependency(%q<shotgun>, ["~> 0.9.1"])
      s.add_dependency(%q<thin>, ["~> 1.6"])
      s.add_dependency(%q<json>, ["~> 1.8"])
      s.add_dependency(%q<coffee-script>, ["~> 2.4"])
    end
  else
    s.add_dependency(%q<rails>, ["< 4.3.0", ">= 4.0.0"])
    s.add_dependency(%q<jquery-rails>, ["< 5.0.0", ">= 3.1.2"])
    s.add_dependency(%q<js_regex>, [">= 1.0.9", "~> 1.0"])
    s.add_dependency(%q<appraisal>, ["~> 2.1"])
    s.add_dependency(%q<coveralls>, ["~> 0.8.10"])
    s.add_dependency(%q<m>, ["~> 1.4"])
    s.add_dependency(%q<minitest>, ["< 6.0.0", ">= 4.7.5"])
    s.add_dependency(%q<mocha>, ["~> 1.1"])
    s.add_dependency(%q<rubocop>, ["~> 0.36.0"])
    s.add_dependency(%q<simplecov>, ["~> 0.11.1"])
    s.add_dependency(%q<sqlite3>, ["~> 1.3"])
    s.add_dependency(%q<byebug>, ["~> 8.2"])
    s.add_dependency(%q<sinatra>, ["~> 1.4"])
    s.add_dependency(%q<shotgun>, ["~> 0.9.1"])
    s.add_dependency(%q<thin>, ["~> 1.6"])
    s.add_dependency(%q<json>, ["~> 1.8"])
    s.add_dependency(%q<coffee-script>, ["~> 2.4"])
  end
end
