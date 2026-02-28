# Kubernetes Labs

Hands-on Kubernetes projects covering **Minikube**, **Kind**, and **AWS EKS** — from basics to production-style deployments.

---

## Projects

### [EKS-cluster](./EKS-cluster/)

Three-tier TODO App (React + Node.js + MongoDB) deployed on **AWS EKS** with ALB Ingress, ECR, and Helm.

### [Kind-Cluster-labs](./Kind-Cluster-labs/)

Projects running on **Kind** (Kubernetes in Docker):

- **django-notes-app** — Django notes app with K8s manifests, autoscaler, and Docker setup
- **nginx** — Nginx deployment with pods, services, jobs, cronjobs, daemonsets, PV/PVC, and more
- **kind-votingapp** — Voting app deployed on Kind cluster

### [minikube-labs](./minikube-labs/)

Projects running on **Minikube**:

- **3-tier chatapp** — Full-stack chat app with frontend, backend, and database
- **db-demo-app** — Database demo application
- **express-demo** — Express.js demo
- **testapp** — Test application for K8s concepts

### [k8s-templates](./k8s-templates/)

Ready-to-use **Kubernetes manifest templates** with essential kubectl commands. Copy, edit, deploy — no need to visit the docs.

---

## Tech Stack

- **Container Runtime**: Docker
- **Local Clusters**: Minikube, Kind
- **Cloud Cluster**: AWS EKS
- **Languages**: Python (Django), JavaScript (React, Node.js, Express)
- **Database**: MongoDB, SQLite
- **CI/CD**: Docker Hub, AWS ECR
- **Ingress**: Nginx Ingress, AWS ALB

---

## Quick Setup

### Minikube

```bash
minikube start
kubectl get nodes
```

### Kind

```bash
kind create cluster --name my-cluster
kubectl get nodes
```

### EKS

```bash
eksctl create cluster --name my-cluster --region us-east-1 --node-type t3.small --nodes 2
kubectl get nodes
```

---

