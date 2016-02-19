# -*- encoding: utf-8 -*-
# stub: rails-settings-cached 0.4.6 ruby lib

Gem::Specification.new do |s|
  s.name = "rails-settings-cached"
  s.version = "0.4.6"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Squeegy", "Georg Ledermann", "100hz", "Jason Lee"]
  s.date = "2015-09-29"
  s.email = "huacnlee@gmail.com"
  s.homepage = "https://github.com/huacnlee/rails-settings-cached"
  s.rubygems_version = "2.5.1"
  s.summary = "This is improved from rails-settings, added caching. Settings is a plugin that makes managing a table of global key, value pairs easy. Think of it like a global Hash stored in you database, that uses simple ActiveRecord like methods for manipulation.  Keep track of any global setting that you dont want to hard code into your rails app.  You can store any kind of object.  Strings, numbers, arrays, or any object. Ported to Rails 3!"

  s.installed_by_version = "2.5.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<rails>, [">= 4.2.0"])
      s.add_development_dependency(%q<rake>, [">= 0"])
      s.add_development_dependency(%q<rspec>, [">= 3.3.0"])
      s.add_development_dependency(%q<rubocop>, [">= 0"])
      s.add_development_dependency(%q<sqlite3>, [">= 1.3.10"])
    else
      s.add_dependency(%q<rails>, [">= 4.2.0"])
      s.add_dependency(%q<rake>, [">= 0"])
      s.add_dependency(%q<rspec>, [">= 3.3.0"])
      s.add_dependency(%q<rubocop>, [">= 0"])
      s.add_dependency(%q<sqlite3>, [">= 1.3.10"])
    end
  else
    s.add_dependency(%q<rails>, [">= 4.2.0"])
    s.add_dependency(%q<rake>, [">= 0"])
    s.add_dependency(%q<rspec>, [">= 3.3.0"])
    s.add_dependency(%q<rubocop>, [">= 0"])
    s.add_dependency(%q<sqlite3>, [">= 1.3.10"])
  end
end
