# -*- encoding: utf-8 -*-
# stub: js_regex 1.0.12 ruby lib

Gem::Specification.new do |s|
  s.name = "js_regex"
  s.version = "1.0.12"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Janosch M\u{fc}ller"]
  s.date = "2016-01-04"
  s.description = "JsRegex converts Ruby's native regular expressions for JavaScript, taking care of various incompatibilities and returning warnings for unsolvable differences."
  s.email = ["janosch84@gmail.com"]
  s.homepage = "https://github.com/janosch-x/js_regex"
  s.licenses = ["MIT"]
  s.rubygems_version = "2.5.1"
  s.summary = "Converts Ruby regexes to JavaScript regexes."

  s.installed_by_version = "2.5.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<regexp_parser>, ["= 0.3.2"])
      s.add_development_dependency(%q<codeclimate-test-reporter>, ["~> 0.4"])
      s.add_development_dependency(%q<rake>, ["~> 10.4"])
      s.add_development_dependency(%q<rspec>, ["~> 3.3"])
      s.add_development_dependency(%q<therubyracer>, ["~> 0.12"])
    else
      s.add_dependency(%q<regexp_parser>, ["= 0.3.2"])
      s.add_dependency(%q<codeclimate-test-reporter>, ["~> 0.4"])
      s.add_dependency(%q<rake>, ["~> 10.4"])
      s.add_dependency(%q<rspec>, ["~> 3.3"])
      s.add_dependency(%q<therubyracer>, ["~> 0.12"])
    end
  else
    s.add_dependency(%q<regexp_parser>, ["= 0.3.2"])
    s.add_dependency(%q<codeclimate-test-reporter>, ["~> 0.4"])
    s.add_dependency(%q<rake>, ["~> 10.4"])
    s.add_dependency(%q<rspec>, ["~> 3.3"])
    s.add_dependency(%q<therubyracer>, ["~> 0.12"])
  end
end
