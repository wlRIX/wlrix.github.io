---
layout: page
title: News
permalink: /news/
---

# News

<ul>
{%- for post in site.posts %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    &mdash; {{ post.date | date: "%-d %B, %Y" }}
    {%- if post.summary %}<br>{{ post.summary }}{% endif %}
  </li>
{%- else %}
  <li>Nothing yet.</li>
{%- endfor %}
</ul>

There is a [feed]({{ '/news/feed.xml' | relative_url }}).
