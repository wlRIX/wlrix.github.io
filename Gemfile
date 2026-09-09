source "https://rubygems.org"

# The site ships its own layouts and styles, so there is no theme gem here.
# .github/workflows/pages.yml builds with this Jekyll rather than GitHub's
# classic Pages builder, which is pinned to Jekyll 3 and a fixed plugin list.
gem "jekyll", "~> 4.4.1"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.17"
  gem "jekyll-sitemap", "~> 1.4"
  gem "jekyll-seo-tag", "~> 2.8"
end

# Windows and JRuby do not include zoneinfo files.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1", :platforms => [:mingw, :x64_mingw, :mswin]
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
