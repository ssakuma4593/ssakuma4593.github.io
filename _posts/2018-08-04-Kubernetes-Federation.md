---
title: Kubernetes
layout: post
---

<div>
	<h3> K8s -> Kubernetes </h3>
	<span class="image"><img src="{{ 'assets/images/kubernetes.png' | relative_url }}" alt="Kubernetes logo" /></span>
	<h4> What is Kubernets? </h4>
		<p> Kubernetes was created in mid 2014 by Google Engineers, but now owned by Cloud Native Computing Foundation. It was inspired by Borg (cluster management) and was called Project Seven of Nine, which was a friendlier version of Borg (Star trek reference). This is why the logo has 7 sides! Eventually it was named 'Kubernetes' which means pilot in Greek. Oh and it is an open source container orchestration system. 
		</p>
	<h4> Architecture </h4>
		<span class="image"><img src="{{ 'assets/images/kubernetes_architecture.png' | relative_url }}" alt="Kubernetes Architecture" /></span>
		<p> There are a lot of vocab words that come with this one, but I think it helps to see where they all go first. <br>
			If you are a small to big picture person, read this starting from the bottom of this section. If you are a big to small picture person like me, read this the way you would other things. 
			The entire running system is called a <u>Cluster</u> and the cluster is organized in a master-slave architecture.<br>
			As the term suggests, the master tells the slave nodes what to do. It also distributes the work and helps the slaves communicate to each other. Kubernetes allows you to <u>label</u> any API object in the system such as pods and nodes so you can group them together to make executing operations on several objects at the same time, a lot easier. Basically imagine having a few boxes labled 'Bathroom' and a few boxes labeled 'Living Room'. You want to move all the things belonging to the Bathroom. You can <u>select</u> all the boxes with that label and perform an action on them. </p> <br>
			<h5> Master Node: </h5>
				<p>
				<u> API Server </u> uses JSON over HTTP and is the interface of Kubernetes to the outside and the inside. It takes in REST requests and changes the etcd.
				<u> etcd </u> is a key-value data store that is the role model for the other nodes. It represents the state of the cluster and the slave nodes look to this to see if anything has changed and if it has, also be inspired (or forced) to change to match that state. <br>
				<u> Scheduler </u> basically does what the job description says it does. The scheduler matches supply with demand by knowing how much resource is needed for each pod and then deciding which node the pod should go in. <br>
				<u> Controller Manager </u> is a process that runs controllers. The controllers work through the API then the developer to figure out which pods should be running when. Types of controllers include <i>StatefulSet</i> which enable persistent state, <i>deployment</i> which is used to scale, update or roll back. </p>
			<h5> Slave Node: </h5>
				<p>
				<u> Kubelet </u> is responsible for the state of each node. So, if the Controller Manager is the governor, the Kubelet is the mayor. It is supposed to keep all the containers on the node healthy. The Kubelet tells the containers when to start up and shut down. <br>
				<u> Kube-proxy </u> works as a network proxy and a load balancer. It is responsible for routing the request coming from the user to the right container. <br>
				<u> cAdvisor </u> monitors all the metrics of each of the containers on the node such as CPU, memory, file and network usage.  <br>
				<u> Service </u> is a group of pods that work together to form a multi-tier application that is defined by networking rules. A service is grouped by labeling all the pods that are in the service as one thing. One service is given a stable IP address and DNS name so that incoming requests can find it even if the pods move or are replaced. It also had the ability to load balance among the pods. Service allows pods to talk to each other and also expose pods to the public internet. <br>
				<u> Pod </u> hold the containers. This is the most basic object for Kubernetes. Each pod shares an IP address, IPC and a hostname, which represents one application or running process. This way, developers don't have to focus on each container, but the application as whole. Also, this makes moving containers in the cluster easier. Imagine containers to be small boxes and pods to be a bigger box that fits these small boxes. When you have to move all the small boxes somewhere else, good thing they are consolidated to one big box! <br>
				</p>
			<h4> Clusters on Clusters! </h4>
				<p> Great, so now you have clusters to deal with all the containers, but now you have multiple clusters, so there is the <b>Federation</b> to manage your clusters. It allows it you sync resources and load balances across clusters</p>
			<h4> Competitors </h4>
				<p> The three biggest players in the container orchestration field is Kubernetes, Docker Swarm, and Apache Mesos. Quickly going through, Docker Swarm's biggest advantage is that everything can be run in one server and it integrates really well with Docker Containers, but Swarm is still evolving. Kubernetes on the other hand is mature, a little more complex to set up, and has to have at least one master and one slave, and is good for medium to large clusters. If you have a super large clusters on thousands of servers, Mesos is what you're looking for. The Loom Systems blog does a very good job explaining the comparisons. <sup><a href="#fn1">1</a></sup> 
<div>
	<hr>
		<sup id="fn1">1. <a href="https://www.loomsystems.com/blog/single-post/2017/06/19/kubernetes-vs-docker-swarm-vs-apache-mesos-container-orchestration-comparison">Aviv Lichtigstein, "DevOps Kubernetes vs. Docker Swarm vs. Apache Mesos: Container Orchestration Comparison" (Loom Systems: June 19, 2017)</a></sup><br>
		<sup id="fn2">2. <a href="https://kubernetes.io">"Production-Grade Container Orchestration" (Kubernetes)</a></sup><br>
		<sup id="fn3">3. <a href="https://www.infoworld.com/article/3268073/containers/what-is-kubernetes-container-orchestration-explained.html">Serdar Yegulalp, "What is Kubernetes? Container Orchestration Explained" (InfoWorld: April 4, 2018)</a></sup><br>
		<sup id="fn4">4. <a href="https://www.redhat.com/en/topics/containers/what-is-kubernetes"> "What is Kubernetes?" (RedHat)</a></sup><br>
		<sup id="fn5">5. <a href="https://cloudacademy.com/blog/what-is-kubernetes/">Adam Hawkins, "What is Kubernetes? An Introductory Overview" (Cloud Academy: January 27, 2017)</a></sup><br>
</div>