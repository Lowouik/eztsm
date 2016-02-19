# -*- encoding: utf-8 -*-
# stub: rails-settings-ui 0.5.0 ruby lib

Gem::Specification.new do |s|
  s.name = "rails-settings-ui"
  s.version = "0.5.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Andrey Morskov"]
  s.date = "2015-08-06"
  s.description = "User interface for manage settings with rails-settings gem"
  s.email = "accessd0@gmail.com"
  s.homepage = "https://github.com/accessd/rails-settings-ui"
  s.licenses = ["MIT"]
  s.rubygems_version = "2.5.1"
  s.summary = "User interface for manage settings (rails engine)"

  s.installed_by_version = "2.5.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<rails>, [">= 3.0"])
      s.add_runtime_dependency(%q<i18n>, [">= 0"])
      s.add_runtime_dependency(%q<haml-rails>, [">= 0"])
      s.add_development_dependency(%q<rspec-rails>, [">= 3.0.1"])
      s.add_development_dependency(%q<capybara>, ["~> 2.4.1"])
      s.add_development_dependency(%q<bundler>, [">= 0"])
      s.add_development_dependency(%q<factory_girl_rails>, [">= 0"])
    else
      s.add_dependency(%q<rails>, [">= 3.0"])
      s.add_dependency(%q<i18n>, [">= 0"])
      s.add_dependency(%q<haml-rails>, [">= 0"])
      s.add_dependency(%q<rspec-rails>, [">= 3.0.1"])
      s.add_dependency(%q<capybara>, ["~> 2.4.1"])
      s.add_dependency(%q<bundler>, [">= 0"])
      s.add_dependency(%q<factory_girl_rails>, [">= 0"])
    end
  else
    s.add_dependency(%q<rails>, [">= 3.0"])
    s.add_dependency(%q<i18n>, [">= 0"])
    s.add_dependency(%q<haml-rails>, [">= 0"])
    s.add_dependency(%q<rspec-rails>, [">= 3.0.1"])
    s.add_dependency(%q<capybara>, ["~> 2.4.1"])
    s.add_dependency(%q<bundler>, [">= 0"])
    s.add_dependency(%q<factory_girl_rails>, [">= 0"])
  end
end
