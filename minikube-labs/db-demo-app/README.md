**🚀 DB Demo App – Kubernetes MongoDB Deployment Guide**

This project demonstrates how to deploy a Node.js application with MongoDB on Kubernetes (Minikube) using two approaches: Single Pod and Multi-Pod configurations.

---

**📁 Project Structure**

```bash
db-demo-app/
├── Dockerfile
├── index.js
├── index.html
├── package.json
├── k8-config-singlepod/
│   ├── deployment-demo.yml
│   └── service-demo.yml
├── k8-configs-multipods/
│   ├── app-deployment.yaml
│   ├── app-service.yaml
│   ├── mongo-deployment.yaml
│   ├── mongo-service.yaml
│   ├── host-pv.yml
│   └── host-pvc.yml
```

---

## 🔹 Option 1: Single Pod Deployment

**🐳 Step 1: Create Docker Image**

```bash
docker build -t <image-name> .
```

**📤 Step 2: Push Image to Docker Hub**

```bash
docker push username/<image-name>:version
```

**☸️ Step 3: Deploy Application**

```bash
kubectl apply -f k8-config-singlepod/deployment-demo.yml
kubectl apply -f k8-config-singlepod/service-demo.yml
```

---

## 🔹 Option 2: Multi-Pod Deployment (Recommended)

This approach separates the Node.js app and MongoDB into different pods with persistent storage.

**📦 Step 1: Create Persistent Volume & Claim**

```bash
kubectl apply -f k8-configs-multipods/host-pv.yml
kubectl apply -f k8-configs-multipods/host-pvc.yml
```

**🍃 Step 2: Deploy MongoDB**

```bash
kubectl apply -f k8-configs-multipods/mongo-deployment.yaml
kubectl apply -f k8-configs-multipods/mongo-service.yaml
```

**🚀 Step 3: Deploy Node.js App**

```bash
kubectl apply -f k8-configs-multipods/app-deployment.yaml
kubectl apply -f k8-configs-multipods/app-service.yaml
```

---

**🔍 Verify Resources**

```bash
kubectl get pods
kubectl get svc
kubectl get deployments
kubectl get pv
kubectl get pvc
```

---

**🌍 Access the Application (Minikube)**

```bash
minikube service <service-name>
```

---

**📜 Check Logs**

Get pod name

```bash
kubectl get pods
```

View logs

```bash
kubectl logs <pod-name>
```

Live logs

```bash
kubectl logs -f <pod-name>
```

---

**🔄 Update Application**

step 1: Update code

step 2: Build new image

step 3: Push image

step 4: Update deployment:

```bash
kubectl set image deployment/<deployment-name> <container-name>=<docker-username>/<image-name>:2.0
```

---

**🧹 Cleanup (Optional)**

Single Pod:

```bash
kubectl delete -f k8-config-singlepod/
```

Multi-Pod:

```bash
kubectl delete -f k8-configs-multipods/
```

---

**📝 Key Concepts Covered**

- Single Pod vs Multi-Pod architecture
- MongoDB deployment on Kubernetes
- PersistentVolume (PV) and PersistentVolumeClaim (PVC)
- Service communication between pods
