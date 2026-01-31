# Nginx on Kubernetes (Kind Cluster)

This project provides a complete set of Kubernetes manifests to deploy a resilient and scalable Nginx web server, specifically designed and tested on a **Kind (Kubernetes in Docker)** cluster.

## 📂 Project Manifests

Below is a breakdown of the Kubernetes configuration files included in this project:

| File             | Type                      | Description                                                                                             |
| :--------------- | :------------------------ | :------------------------------------------------------------------------------------------------------ |
| `namespace.yml`  | **Namespace**             | Creates the isolated `nginx` namespace to keep resources organized.                                     |
| `pv.yml`         | **PersistentVolume**      | Allocates **1Gi** of storage. Uses `hostPath` pointing to `/mnt/data` _inside_ the Kind node container. |
| `pvc.yml`        | **PersistentVolumeClaim** | Requests storage from the PV to be used by the Deployment.                                              |
| `deployment.yml` | **Deployment**            | Runs **2 replicas** of `nginx:latest`. Mounts the PVC to `/var/www/html` for persistence.               |
| `service.yml`    | **Service**               | Exposes the Nginx pods internally via **ClusterIP** on port **80**.                                     |
| `daemonset.yml`  | **DaemonSet**             | _(Optional)_ Example configuration for running a pod on every node.                                     |
| `job.yml`        | **Job**                   | _(Optional)_ Example for running a one-off task.                                                        |
| `cronjob.yml`    | **CronJob**               | _(Optional)_ Example for running scheduled tasks.                                                       |

## 🛠 Prerequisites

- **Docker Desktop**: Required to run Kind nodes.
- **Kind**: The tool for running local Kubernetes clusters.
  ```bash
  kind --version
  ```
- **kubectl**: Configured to talk to your Kind cluster.
  ```bash
  kubectl config current-context
  ```

## 🚀 Installation

1.  **Ensure Kind Cluster is Running**

    ```bash
    kind create cluster --name nginx-lab
    ```

2.  **Create the Namespace**

    ```bash
    kubectl apply -f namespace.yml
    ```

3.  **Deploy Storage & Application**
    Apply all manifests. The PV will use the Kind node's local storage.
    ```bash
    kubectl apply -f .
    ```

## ✅ Verification

1.  **Check Pods & Status**

    ```bash
    kubectl get all -n nginx
    ```

2.  **Verify Persistence in Kind**
    To see the actual data stored in the PV, execute a shell inside the Kind node:

    ```bash
    # Get the Kind node name (e.g., nginx-lab-control-plane)
    docker ps

    # Check data directory inside the node
    docker exec -it <kind-node-name> ls -la /mnt/data
    ```

3.  **Port Forwarding**
    Access Nginx from your Windows browser:
    ```bash
    kubectl port-forward svc/nginx-service 8080:80 -n nginx
    ```
    Then open [http://localhost:8080](http://localhost:8080).

## 🧹 Cleanup

```bash
kubectl delete namespace nginx
# kind delete cluster --name nginx-lab
```
