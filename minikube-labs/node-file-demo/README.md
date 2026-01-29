**🚀 Node File Demo – Kubernetes Persistent Volume Guide**

This project demonstrates how to containerize a Node.js application with persistent storage using PersistentVolumeClaim (PVC) and deploy it on Kubernetes (Minikube).

---

**📁 Project Structure**

```bash
node-file-demo/
├── Dockerfile
├── app.js
├── emails.txt
├── package.json
├── public/
├── k8-configs/
   ├── deployment.yml
   ├── service.yml
   └── pvc.yml
```

---

**🐳 Step 1: Create Docker Image**

1. Create a dockerfile or use existing
2. Build the docker image

```bash
docker build -t <image-name> .
```

---

**📤 Step 2: Push Image to Docker Hub**

```bash
docker push username/<image-name>:version
```

---

**☸️ Step 3: Create Persistent Volume Claim**

```bash
kubectl apply -f k8-configs/pvc.yml
```

---

**📦 Step 4: Kubernetes Deployment**

```bash
kubectl apply -f k8-configs/deployment.yml
```

---

**🌐 Step 5: Create Service**

```bash
kubectl apply -f k8-configs/service.yml
```

---

**🔍 Step 6: Verify Resources**

```bash
kubectl get pods
kubectl get svc
kubectl get deployments
kubectl get pvc
```

---

**🌍 Step 7: Access the Application (Minikube)**

```bash
minikube service node-file-app
```

---

**📜 Step 8: Check Logs**

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

**🔄 Step 9: Update Application**

step 1: Update code

step 2: Build new image

step 3: Push image

step 4: Update deployment:

```bash
kubectl set image deployment/node-file-app node-file-app=<docker-username>/node-file-app:2.0
```

---

**🧹 Cleanup (Optional)**

```bash
kubectl delete deployment node-file-app
kubectl delete service node-file-app
kubectl delete pvc email-pvc
```

---

**📝 Key Concepts Covered**

- PersistentVolumeClaim (PVC) for data persistence
- Volume mounts in Kubernetes deployments
- LoadBalancer service type
