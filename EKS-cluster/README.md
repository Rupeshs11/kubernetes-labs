# 🚀 Three-Tier Application Deployment on AWS EKS

A **production-style Three-Tier Web Application** deployed on **AWS EKS** using **Docker, Kubernetes, AWS ECR, ALB Ingress Controller, and MongoDB**.

This repository is designed as a **practical reference guide** so you can **re-deploy the entire project from scratch anytime** without confusion.

---

## 🧱 Architecture Overview

**Frontend (React)**
→ **Backend (Node.js / Express API)**
→ **Database (MongoDB)**

All components are containerized and orchestrated using **Kubernetes (EKS)**.

Traffic Flow:

```
User → ALB (Ingress) → Frontend Service → Backend Service → MongoDB
```

---

## 🛠 Tech Stack

- **Frontend**: React
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Containerization**: Docker
- **Orchestration**: Kubernetes (EKS)
- **Image Registry**: AWS ECR
- **Ingress**: AWS Load Balancer Controller (ALB)
- **Cloud Provider**: AWS (us-east-1)

---

## 📂 Project Structure

```
Three-tier-Application-Deployment/
│
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│
├── k8s_manifests/
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── mongodb-deployment.yaml
│   ├── mongodb-service.yaml
│   ├── mongo-secret.yaml
│   └── ingress.yaml
│
└── README.md
```

---

## ⚙️ Prerequisites

Make sure the following are installed and configured:

- AWS CLI (configured with IAM user)
- eksctl
- kubectl
- Docker
- Helm

AWS requirements:

- AWS Account
- IAM permissions for EKS, EC2, ECR, ELB, IAM

---

## ☸️ Step 1: Create EKS Cluster

```bash
eksctl create cluster \
  --name three-tier-cluster \
  --region us-east-1 \
  --nodegroup-name ng-default \
  --node-type t3.small \
  --nodes 2
```

Verify:

```bash
kubectl get nodes
```

---

## 🐳 Step 2: Build & Push Docker Images to ECR

### Create ECR Repositories

```bash
aws ecr create-repository --repository-name frontend-repo --region us-east-1
aws ecr create-repository --repository-name backend-repo --region us-east-1
```

### Authenticate Docker

```bash
aws ecr get-login-password --region us-east-1 | \
 docker login --username AWS --password-stdin <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com
```

### Build & Push Images

#### Backend

```bash
cd backend
docker build -t backend-repo:latest .
docker tag backend-repo:latest <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/backend-repo:latest
docker push <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/backend-repo:latest
```

#### Frontend

```bash
cd frontend
docker build -t frontend-repo:latest .
docker tag frontend-repo:latest <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/frontend-repo:latest
docker push <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/frontend-repo:latest
```

---

## 🗄 Step 3: Deploy MongoDB

```bash
kubectl apply -f k8s_manifests/mongo-secret.yaml
kubectl apply -f k8s_manifests/mongodb-deployment.yaml
kubectl apply -f k8s_manifests/mongodb-service.yaml
```

Verify:

```bash
kubectl get pods
```

---

## 🚀 Step 4: Deploy Backend & Frontend

```bash
kubectl apply -f k8s_manifests/backend-deployment.yaml
kubectl apply -f k8s_manifests/backend-service.yaml

kubectl apply -f k8s_manifests/frontend-deployment.yaml
kubectl apply -f k8s_manifests/frontend-service.yaml
```

Verify:

```bash
kubectl get pods
kubectl get svc
```

---

## 🌐 Step 5: Install AWS Load Balancer Controller

### Associate OIDC

```bash
eksctl utils associate-iam-oidc-provider \
  --cluster three-tier-cluster \
  --region us-east-1 \
  --approve
```

### Create IAM Policy

```bash
curl -O https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.5.4/docs/install/iam_policy.json

aws iam create-policy \
 --policy-name AWSLoadBalancerControllerIAMPolicy \
 --policy-document file://iam_policy.json
```

### Create IAM Service Account

```bash
eksctl create iamserviceaccount \
  --cluster three-tier-cluster \
  --region us-east-1 \
  --namespace kube-system \
  --name aws-load-balancer-controller \
  --attach-policy-arn arn:aws:iam::<ACCOUNT_ID>:policy/AWSLoadBalancerControllerIAMPolicy \
  --approve
```

### Install Controller Using Helm

```bash
helm repo add eks https://aws.github.io/eks-charts
helm repo update

helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --set clusterName=three-tier-cluster \
  --set serviceAccount.create=false \
  --set serviceAccount.name=aws-load-balancer-controller
```

Verify:

```bash
kubectl get pods -n kube-system
```

---

## 🌍 Step 6: Configure Ingress (ALB)

```bash
kubectl apply -f k8s_manifests/ingress.yaml
```

Check ALB:

```bash
kubectl get ingress
```

Access Application:

```
http://<ALB-DNS-NAME>
```

---

## 🔁 Useful Commands

```bash
kubectl logs deployment/frontend
kubectl logs deployment/backend

kubectl rollout restart deployment/frontend
kubectl rollout restart deployment/backend

kubectl exec -it deployment/backend -- sh
```

---

## 📌 Key Configuration Notes

- Frontend communicates with backend using:

  ```
  /api/tasks
  ```

- Backend service name is used internally via Kubernetes DNS
- ALB handles external traffic routing

---

## 📸 Screenshots

![One Piece TODO App](assets/onepiece-todo.png)

---

## 🧹 Cleanup (Avoid Billing)

```bash
eksctl delete cluster --name three-tier-cluster --region us-east-1
```

---

## 🏁 Summary

This project represents a **real-world Kubernetes deployment workflow** and can be reused for:

- DevOps practice
- Resume / GitHub showcase
- EKS hands-on revision

---
