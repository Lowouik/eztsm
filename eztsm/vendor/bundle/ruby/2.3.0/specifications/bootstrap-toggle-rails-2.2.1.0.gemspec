# -*- encoding: utf-8 -*-
# stub: bootstrap-toggle-rails 2.2.1.0 ruby lib

Gem::Specification.new do |s|
  s.name = "bootstrap-toggle-rails"
  s.version = "2.2.1.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Raphael Kallensee"]
  s.bindir = "exe"
  s.date = "2016-01-11"
  s.description = "Bootstrap Toggle is a highly flexible Bootstrap plugin that converts checkboxes into toggles."
  s.email = ["raphael@kallensee.name"]
  s.homepage = "https://github.com/rkallensee/bootstrap-toggle-rails"
  s.licenses = ["MIT"]
  s.rubygems_version = "2.5.1"
  s.summary = "Bootstrap Toggle (unofficial) plugin for the Rails asset pipeline"

  s.installed_by_version = "2.5.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<bundler>, ["~> 1.10"])
      s.add_development_dependency(%q<rake>, ["~> 10.0"])
    else
      s.add_dependency(%q<bundler>, ["~> 1.10"])
      s.add_dependency(%q<rake>, ["~> 10.0"])
    end
  else
    s.add_dependency(%q<bundler>, ["~> 1.10"])
    s.add_dependency(%q<rake>, ["~> 10.0"])
  end
end
