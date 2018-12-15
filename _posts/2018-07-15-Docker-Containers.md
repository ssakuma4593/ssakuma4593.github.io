---
title: Docker
layout: post
---

<div>
	<h3> Containers on Containers? </h3>
	<span class="image"><img src="{{ 'assets/images/dockerlogo.jpg' | relative_url }}" alt="Docker logo" /></span>
	<h4> What is Docker? </h4>
		<p> Docker was released in 2013 and it is opensource. Looking at the logo, I think helps explain what this product is. Imagine Docker as being like a boat. The Linux server being the ocean and inside docker are containers that carry applications. Docker is not the only ones creating containers, but they are like the Kleenex of containers. As tech companies grow, they wage a relentless battle with complexity and Docker provides a solution. <sup><a href="#fn1">1</a></sup>
		</p>
	<h4> What are Containers? </h4>
		<blockquote>A container image is a lightweight, stand-alone, executable package of a piece of software that includes everything needed to run it: code, runtime, system tools, system libraries, settings.
		</blockquote>
		<p> Cool. What does this mean tho? Have you ever tried to be on a website and it tells you to upgrade your Flash? Or you build an app using a few different opensource libraries that have different dependencies? Like one depends on Python 2 and the other Python 3? <i>How annoying...</i> Containers let you first break up your code into microservices, then give each bit the perfect little environment for it to run in. Like for the Python dependency, just create two containers, one with Python 2 and the other with Python 3. They can talk to each other and be deployed independently. <i>Think of the possibilities!</i>
		</p>
	<h4> Sounds so useful. How did they do this before? </h4>
		<p> Before the existence of containers, we had Virtual Machines(VMs). We still have VMs, just to clarify, but let's say you want to scale a service, you create a new VM, install all of its dependencies, build your service in it, then deploy that into the world. Yeah, sounds a lot like what the container does, but containers are a lot lighter. Think of how long it takes to spin up a VM. The answer is basically forever.<sup><a href="#fn2">2</a></sup>
		</p>
		<span class="image"><img src="{{ 'assets/images/containers.png' | relative_url }}" alt="Containers vs VMs" /></span>
		<h5> Virtual Machines </h5>
			<p> VM is an abstraction of the physical hardware, which turns one sever into multiple servers. The hypervisor allows multiple VMs to run on a single machine. <b>Fun Fact:</b> The kernel is known as the <u>supervisor</u> because it is basically the brain of the Operating System. It decides how to deal with memory, translates input/output requests to instructions for the CPU, etc. The <u>hypervisor</u> is the supervisor's supervisor. It intercepts commands to kernel and then tells the kernel what to do. VMs are tens of GBs, which are huuuge compared to containers.
			</p>
		<h5> Containers </h5>
			<p> Container is an abstraction at the application layer. They share the OS kernel with each container running as isolated processes, making this super lightweight, coming in at tens of MBs. Basically starting up instantaneously. With perfectly tuned containers you can have 4-6 times the number of server applications than VMs.
			</p>
	<h4> What other containers are there? </h4>
		<p> Containers have actually been around since 2000 with FreeBSD Jails. Since then there are Oracle Zones, OpenVZ and Linux Containers(LXC). Docker was originally built on top of LXC, but then dropped LXC and replaced it with <b>libcontainer</b> written in Go. <sup><a href="#fn3">3</a></sup>
		</p>
		<span class="image"><img src="{{ 'assets/images/libcontainers.png' | relative_url }}" alt="Libcontainers" /></span>
	<h4> Summary </h4>
		<div class="table-wrapper">
		<table>
			<thead>
				<tr>
					<th>Pros</th>
					<th>Cons</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td> 
						<ul>
							<li> Modularity </li>
							<li> Lend to continuous integration and deployment </li>
							<li> Layers and image version control </li>
							<li> Rollback </li>
						</ul>
					</td>
					<td> 
						<ul>
							<li> One OS </li>
							<li> Don't get UNIX-like functionality like traditional LNX </li>
							<li> Security risk of sharing host kernel </li>
						</ul>
					</td>
				</tr>
			</tbody>
		</table>
		<h5> Pros </h5>
				<ol>
					<li><u> Modularity:</u> Containers allow you to take down certain parts of the applications, repair and restore it without taking down the whole thing. This also means that you can do parallel work on each containers and promotes agile teams.</li><br>
					<li><u>Continuous Integration/Continuous Deployment:</u> Expanding a service can be as easy as creating a new container, deploying it, then taking down the old container.</li><br>
					<li><u> Layers and Version Control: </u> Each docker image file has a series of layers. A new layer is added whenever the images changes. Docker reuses the layers for new containers to make the process of building new containers even faster. Now you have a changelog!</li><br>
					<li><u> Rollback: </u> Since every image has layers, you can easier roll back to the last layer. </li>
				</ol>
		<h5> Cons </h5>
			<ol> 
				<li><u> One OS: </u> With a VM, since you are creating a whole new machine, you can have different OSs. Containers only allow one OS.</li> <br>
				<li><u> Don't get UNIX-like functionality: </u> Docker doesn't give you same functionality like traditional LNX. For example, cron or syslogs processes, or cleaning up grandchild processes. </li><br>
				<li><u> Security Risk: </u> Other Linux subsystems are not namespaced (SELinux, Cgroups, and /dev/sd* devices), which means that if an attacker gets access of these subsystems, since the kernel is shared the host will be compromised, unlike in VMs where they are more segrated from the host. <a href="#fn4">4</a></sup></li>
			</ol>
		<h4> Containers gone wild! </h4>
			<p> In regards to the containers themselves, Docker is THE container to go to. However, given the short lifetime and density of containers, you need something that will monitor and control these containers. Imagine being in a room filled with containers and not knowing what are in these containers? Kind of reminds me of the fridge situation where I never know if something is rotting somewhere. <i>So stressful...</i> Anyways, the monitoring is called <b> container orchestration </b>. (I need a fridge items orchestration) In this Container Orchestration space, Docker Swarm has a huge competitior: <b>Kubernetes</b> written by Google, which is the most popular. Docker has integrated Kubernetes, probably due to its strong presence in this space. Amazon also has an option that works with their cloud: <b>Amazon Elastic Container Service(ECS)</b>.<sup><a href="#fn5">5</a></sup> 
			</p>
</div>
<div>
	<hr>
		<sup id="fn1">1. <a href="https://www.theverge.com/circuitbreaker/2018/5/25/17386716/docker-kubernetes-containers-explained">Paul Miller, "Living in a Docker World" (The Verge: May 25, 2018)</a></sup><br>
		<sup id="fn2">2. <a href="https://www.docker.com/what-container">"What is a Container" (Docker)</a></sup><br>
		<sup id="fn3">3. <a href="https://www.infoq.com/news/2014/03/docker_0_9">Chris Swan, "Docker drops LXC as Default Execution Environment" (InfoQ: March 13, 2014)</a></sup><br>
		<sup id="fn4">4. <a href="https://www.redhat.com/en/topics/containers/what-is-docker"> "What is Docker?" (RedHat)</a></sup><br>
		<sup id="fn5">5. <a href="https://www.zdnet.com/article/what-is-docker-and-why-is-it-so-darn-popular/">Steven J. Vaughan-Nichols, "What is Docker and Why is it so Darn Popular?" (ZDNet: March 21, 2018)</a></sup><br>
</div>