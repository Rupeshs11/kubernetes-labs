# Django Notes App - Kind Cluster Deployment

A simple Notes App built with Django, containerized with Docker, and deployed on a **Kind (Kubernetes in Docker)** cluster with Horizontal Pod Autoscaler (HPA).

---

## 🛠️ Tech Stack

| Layer         | Technology                      |
| ------------- | ------------------------------- |
| Backend       | Python 3.9, Django              |
| Frontend      | React                           |
| Container     | Docker                          |
| Orchestration | Kubernetes (Kind)               |
| Scaling       | HPA (Horizontal Pod Autoscaler) |

---

## 📁 Project Structure

```
django-notes-app/
├── api/                  # Django REST API
├── notesapp/             # Django app configuration
├── mynotes/              # Frontend application
├── staticfiles/          # Static assets
├── k8s/                  # Kubernetes manifests
│   ├── namespace.yml     # Namespace configuration
│   ├── deployment.yml    # Deployment & Service
│   └── hpa.yml           # Horizontal Pod Autoscaler
├── Dockerfile            # Docker build configuration
├── docker-compose.yml    # Docker Compose setup
├── requirements.txt      # Python dependencies
└── manage.py             # Django management script
```

---

## ⚙️ Prerequisites

- Docker Desktop installed and running
- Kind CLI installed
- kubectl installed

---

## 🚀 Quick Start - Kind Cluster Deployment

### Step 1: Create Kind Cluster

```bash
kind create cluster --name notes-cluster
```

### Step 2: Verify Cluster

```bash
kubectl cluster-info --context kind-notes-cluster
kubectl get nodes
```

### Step 3: Deploy the Application

```bash
# Create namespace
kubectl apply -f k8s/namespace.yml

# Deploy application and service
kubectl apply -f k8s/deployment.yml

# Apply Horizontal Pod Autoscaler
kubectl apply -f k8s/hpa.yml
```

### Step 4: Verify Deployment

```bash
# Check all resources in the namespace
kubectl get all -n nginx

# Check deployment status
kubectl get deployment -n nginx

# Check pods
kubectl get pods -n nginx

# Check HPA status
kubectl get hpa -n nginx
```

### Step 5: Access the Application

```bash
# Port forward to access locally
kubectl port-forward svc/noteapp-service 8000:8000 -n nginx
```

Open your browser and navigate to: `http://localhost:8000`

---

## 📦 Building Docker Image Locally

```bash
# Build the image
docker build -t django-noteapp:latest .

# Tag for your registry
docker tag django-noteapp:latest yourusername/django-noteapp:01

# Push to registry
docker push yourusername/django-noteapp:01
```

---

## 🔄 Using Docker Compose (Alternative)

```bash
docker-compose up -d
```

Access at: `http://localhost:8000`

---

## 📊 Kubernetes Resources Overview

### Deployment Configuration

- **Replicas**: 1 (scales up to 5 with HPA)
- **Image**: `rupeshs11/django-noteapp:01`
- **Port**: 8000
- **Health Checks**: Liveness & Readiness probes configured

### Resource Limits

| Type     | CPU  | Memory |
| -------- | ---- | ------ |
| Requests | 100m | 128Mi  |
| Limits   | 200m | 256Mi  |

### HPA Configuration

| Parameter    | Value          |
| ------------ | -------------- |
| Min Replicas | 1              |
| Max Replicas | 5              |
| CPU Target   | 5% utilization |

---

## 🧪 Testing HPA (Auto-Scaling)

### Install Metrics Server (Required for HPA)

```bash
# Apply metrics server for Kind
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# Patch metrics server for Kind (insecure TLS)
kubectl patch -n kube-system deployment metrics-server --type='json' -p='[{"op": "add", "path": "/spec/template/spec/containers/0/args/-", "value": "--kubelet-insecure-tls"}]'
```

### Generate Load to Test Scaling

```bash
# Run a load generator pod
kubectl run -i --tty load-generator --rm --image=busybox --restart=Never -n nginx -- sh

# Inside the pod, run:
while true; do wget -q -O- http://noteapp-service:8000; done
```

### Watch HPA in Action

```bash
kubectl get hpa -n nginx -w
```

---

## 🔧 Useful Commands

```bash
# View pod logs
kubectl logs -f <pod-name> -n nginx

# Describe deployment
kubectl describe deployment notesapp-deployment -n nginx

# Scale deployment manually
kubectl scale deployment notesapp-deployment --replicas=3 -n nginx

# Delete all resources
kubectl delete -f k8s/

# Delete Kind cluster
kind delete cluster --name notes-cluster
```

---

## 🧹 Cleanup

```bash
# Delete application resources
kubectl delete -f k8s/hpa.yml
kubectl delete -f k8s/deployment.yml
kubectl delete -f k8s/namespace.yml

# Delete the Kind cluster
kind delete cluster --name notes-cluster
```

---

