#!/usr/bin/env ruby
# Generates static goal detail pages from _data/birthday_goals.yml.
# Run after adding goals: ruby scripts/generate_goal_pages.rb

require "yaml"
require "fileutils"

ROOT = File.expand_path("..", __dir__)
data = YAML.load_file(File.join(ROOT, "_data/birthday_goals.yml"))
out_dir = File.join(ROOT, "_goal_pages")
FileUtils.mkdir_p(out_dir)
Dir.glob(File.join(out_dir, "*.md")).each { |f| File.delete(f) }

def yaml_string(value)
  escaped = value.to_s.gsub("\\", "\\\\").gsub('"', '\\"')
  "\"#{escaped}\""
end

count = 0
data["years"].each do |year|
  age = year["age"]
  next unless year["categories"]

  year["categories"].each do |cat|
    cat["goals"].each do |goal|
      num = goal["number"]
      slug = goal["title"].downcase.gsub(/[^a-z0-9]+/, "-").gsub(/\A-|-\z/, "")
      filename = "#{age}-#{format("%02d", num)}-#{slug[0, 40]}.md"
      content = <<~YAML
        ---
        layout: goal
        title: #{yaml_string(goal["title"])}
        year: #{age}
        number: #{num}
        category: #{yaml_string(cat["name"])}
        section: #{yaml_string(cat["section"])}
        permalink: /birthday-goals/#{age}/#{num}/
        ---
      YAML
      File.write(File.join(out_dir, filename), content)
      count += 1
    end
  end
end

puts "Generated #{count} goal pages in _goal_pages/"
