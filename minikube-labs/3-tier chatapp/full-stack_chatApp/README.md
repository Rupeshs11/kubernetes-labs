# Real-Time Chat Application on Kubernetes

A full-stack real-time chat application deployed on Kubernetes using Minikube. This project demonstrates a 3-tier architecture with MongoDB, Node.js backend, and Nginx frontend.

## Tech Stack

| Layer    | Technology                  |
| -------- | --------------------------- |
| Frontend | React, TailwindCSS, Nginx   |
| Backend  | Node.js, Express, Socket.io |
| Database | MongoDB                     |
| Platform | Kubernetes (Minikube)       |

## Prerequisites

- [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Docker](https://www.docker.com/get-started)

---

## Deployment Steps

### 1. Enable Ingress Addon

```bash
minikube addons enable ingress
```

---

### 2. Create Namespace

```bash
kubectl apply -f namespace.yml
```

Verify:

```bash
kubectl get namespaces
```

---

### 3. Create Secrets (JWT / App Secrets)

```bash
kubectl apply -f secrets.yml
```

Verify:

```bash
kubectl get secrets -n chat-app
```

---

### 4. Deploy MongoDB

```bash
kubectl apply -f mongo-deployment.yml
kubectl apply -f mongo-service.yml
```

Verify:

```bash
kubectl get pods -n chat-app
kubectl get svc -n chat-app
```

---

### 5. Deploy Backend (Node.js)

```bash
kubectl apply -f backend-deployment.yml
kubectl apply -f backend-service.yml
```

Check logs:

```bash
kubectl logs deployment/backend-deployment -n chat-app
```

---

### 6. Deploy Frontend (Nginx)

```bash
kubectl apply -f frontend-deployment.yml
kubectl apply -f frontend-service.yml
```

Verify:

```bash
kubectl get pods -n chat-app
```

---

### 7. Deploy Ingress

```bash
kubectl apply -f ingress.yml
```

Verify:

```bash
kubectl get ingress -n chat-app
```

---

### 8. Start Minikube Tunnel

```bash
minikube tunnel
```

> **Note:** Keep this terminal open.

---

### 9. Configure Hosts File

Add the following entry to your system hosts file:

**Windows:**

```
C:\Windows\System32\drivers\etc\hosts
```

**Linux / macOS:**

```
/etc/hosts
```

Add this line:

```
192.168.49.2 chat-knox.com
```

> **Tip:** Run `minikube ip` if your IP is different.

---

### 10. Access the Application

Open your browser and navigate to:

```
http://chat-knox.com
```

---

## Useful Debug Commands

```bash
# List all pods
kubectl get pods -n chat-app

# Describe a specific pod
kubectl describe pod <pod-name> -n chat-app

# View pod logs
kubectl logs <pod-name> -n chat-app

# List all services
kubectl get svc -n chat-app

# List ingress resources
kubectl get ingress -n chat-app
```

---

## Project Structure

```
k8s/
├── namespace.yml
├── secrets.yml
├── mongo-deployment.yml
├── mongo-service.yml
├── backend-deployment.yml
├── backend-service.yml
├── frontend-deployment.yml
├── frontend-service.yml
└── ingress.yml
```

