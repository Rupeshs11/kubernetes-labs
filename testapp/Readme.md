**🚀 Node App – Kubernetes Deployment Guide**

This project demonstrates how to containerize a Node.js application, push it to Docker Hub, and deploy it on Kubernetes (Minikube).

----------

**📁 Project Structure**

```bash
node-app/
├── Dockerfile
├── package.json
├── server.js
├── k8-config/
   ├── deployment.yaml
   |── service.yaml 

```
----------

**🐳 Step 1: Create Docker Image**

1.Create a dockerfile or use existing
2.build the docker image. 

```bash
docker build -t < image-name > .
```
----------

**📤 Step 2: Push Image to Docker Hub**

```bash
docker push username/< imgae-name > : version
```

----------
**☸️ Step 3: Kubernetes Deployment**
```bash
kubectl apply -f deployment.yaml
```

----------

**🌐 Step 4: Create Service**
```bash
kubectl apply -f service.yaml
```
----------

**🔍 Step 5: Verify Resources**

```bash
kubectl get pods
kubectl get svc
kubectl get deployments
```
----------

**🌍 Step 6: Access the Application (Minikube)**

```bash
minikube service node-app-service
```
----------

**📜 Step 7: Check Logs**

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
----------
 
🔄 Step 8: Update Application

step 1: Update code

step 2:Build new image

step 3: Push image
 
step 4 : Update deployment:

```bash

kubectl set image deployment/node-app node-app=<docker-username>/node-app:2.0

```



----------

🧹 Cleanup (Optional)

kubectl delete deployment node-app
kubectl delete service node-app-service
