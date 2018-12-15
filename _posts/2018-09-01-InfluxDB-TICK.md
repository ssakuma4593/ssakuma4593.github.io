---
title: InfluxDB
layout: post
---

<div>
	<h3> InfluxData </h3>
	<span class="image"><img src="{{ 'assets/images/Influxdb.png' | relative_url }}" alt="InfluxDB logo" /></span>
	<h4> So Influx is like another Database? </h4>
		<p> InfluxData is the company that built Influx DB back in 2013 backed by Y-Combinator. InfluxDB is opensource and written in GO, but the key thing that differentiates it from general databases is that it is made to handle timeseries data well. This means fast and high availability storage and retrieval.<sup><a href="#fn1">1</a></sup>
		</p>
	<h4> TICK Stack </h4>
		<p> Thanks, Kesha. Actually, Kesha has nothing to do with this, but InfluxData provides not just InfluxDB but a whole stack to collect, store, show data and send alerts. This has become increasingly important due to IOT to record events across multiple applications. <br>
				<u> Telegraf </u> writes to the db <br>
				<u> InfluxDB </u> gathers data by using series and tags <br>
				<u> Chronograf </u> displays the data with graphs <br>
				<u> Kapacitor </u> sends alerts <br>
		Currently, it is leading in the timeseries database space because of it is easy to install and use and is scalable to larger systems. It also plays well with a wide range of client libraries and binaries, which makes integration much smoother. <sup><a href="#fn2">2</a></sup>
		</p>
	<h4> How do you actually use this? </h4>
		<p> In your codebase, when something happens that you want to record, you tag by <u>fieldset</u>, <u>tagset</u>, and <u>timestamp</u>. For example, I want to keep track of how many times my boyfriend goes to the bathroom and leaves the toilet seat up. Each fieldset would get created when he visited the bathoom and it would look like 'Bathroom visit=1' (for yes, toilet seat was left up). Let's say he goes again but this time he remembers to put it back down, it would look like 'Bathroom visit=0'. Both of these are marked with a timestamp <br>
		For the tagset, you group the fieldset by a tag. So in this case, my tagset would be something like 'Person=Boyfriend'. This would help if I'm crazy and started collecting stats on whoever came to my house and went to the bathroom, so I can have a tag 'Person=other'. (I think I've gone too far with this ...) Now all the stats I collected can be grouped together. If you've ever created a blog, this tagging concept should be familiar. <br>
		A cool feature is that you can actually run continuous queries to store the results of target measures. For example, you can run a job to write to the database every 10 minutes to say, in the last ten minutes, how many people went to my blog. <sup><a href="#fn3">3</a></sup>
	</p>
	<h4> Competitors </h4>
		<p> A few examples are eXtremeDB, Graphite, Riak, RRDtool, and Informix TimeSeries. I'll briefly go over Graphite because this is what we switched over from. Graphite is great. It comes with a powerful api to query your timeseries data, but there is a storage limitation for larger setups. Since it can't keep all file descriptors in memory, it has to take the time to open, find, and close files that its looking for. It is not optimized to write to the database because all of the metrics comes in at once, which is probably why InfluxDB is growing so fast with companies like IBM and Cisco migrating over.  <sup><a href="#fn4">4</a></sup>
<div>
	<hr>
		<sup id="fn1">1. <a href="https://www.opsview.com/integrations/databases/influxdb">Owen Jenkins, "InfluxDB Opspack" (Opsview: June 18, 2018)</a></sup><br>
		<sup id="fn2">2. <a href="https://opensourceforu.com/2016/12/introduction-influxdb-time-series-database/">Romin Irani, "Introduction to InfluxDB, a Time Series Database" (OpenSource: December 19, 2016)</a></sup><br>
		<sup id="fn3">3. <a href="https://wiki.archlinux.org/index.php/InfluxDB">"InfluxDB" (ArchLinux)</a></sup><br>
		<sup id="fn4">4. <a href="http://dieter.plaetinck.be/post/on-graphite-whisper-and-influxdb/">Dieter Plaetinck "On Graphite Whiper and InfluxDB" (May 18, 2014)</a></sup><br>
</div>