# K8s Templates

Ready-to-use Kubernetes manifest templates. Copy, edit, apply.

## Templates

| File                                                   | What it does                                     |
| ------------------------------------------------------ | ------------------------------------------------ |
| [pod.yml](./pod.yml)                                   | Single Pod                                       |
| [multi-container-pod.yml](./multi-container-pod.yml)   | Pod with init + sidecar containers               |
| [deployment.yml](./deployment.yml)                     | Deployment with rolling updates                  |
| [statefulset.yml](./statefulset.yml)                   | StatefulSet for databases                        |
| [daemonset.yml](./daemonset.yml)                       | Runs on every node                               |
| [job.yml](./job.yml)                                   | One-time task                                    |
| [cronjob.yml](./cronjob.yml)                           | Scheduled task                                   |
| [service-clusterip.yml](./service-clusterip.yml)       | Internal service                                 |
| [service-nodeport.yml](./service-nodeport.yml)         | External via node port                           |
| [service-loadbalancer.yml](./service-loadbalancer.yml) | Cloud load balancer                              |
| [service-headless.yml](./service-headless.yml)         | Direct pod DNS (for StatefulSets)                |
| [ingress.yml](./ingress.yml)                           | HTTP routing                                     |
| [configmap.yml](./configmap.yml)                       | Config data                                      |
| [secret.yml](./secret.yml)                             | Sensitive data                                   |
| [pv.yml](./pv.yml)                                     | PersistentVolume                                 |
| [pvc.yml](./pvc.yml)                                   | PersistentVolumeClaim                            |
| [namespace.yml](./namespace.yml)                       | Namespace                                        |
| [hpa.yml](./hpa.yml)                                   | Auto-scaling                                     |
| [serviceaccount.yml](./serviceaccount.yml)             | Pod identity                                     |
| [role.yml](./role.yml)                                 | Namespace permissions                            |
| [rolebinding.yml](./rolebinding.yml)                   | Bind role to user/SA                             |
| [clusterrole.yml](./clusterrole.yml)                   | Cluster-wide permissions                         |
| [clusterrolebinding.yml](./clusterrolebinding.yml)     | Bind cluster role                                |
| [networkpolicy.yml](./networkpolicy.yml)               | Traffic rules                                    |
| [resourcequota.yml](./resourcequota.yml)               | Namespace resource limits                        |
| [limitrange.yml](./limitrange.yml)                     | Default pod limits                               |
| [kind-cluster-config.yml](./kind-cluster-config.yml)   | Kind cluster setup (1 control-plane + 2 workers) |

---

## Essential Commands

### Cluster Info

```bash
kubectl cluster-info
kubectl get nodes
kubectl get nodes -o wide
kubectl version --short
kubectl api-resources
```

### Apply & Delete

```bash
kubectl apply -f <file>.yml
kubectl apply -f <folder>/
kubectl delete -f <file>.yml
kubectl delete pod <pod-name>
kubectl delete deployment <name>
kubectl delete all --all -n <namespace>
```

### Get Resources

```bash
kubectl get pods
kubectl get pods -o wide
kubectl get pods -n <namespace>
kubectl get pods --all-namespaces
kubectl get svc
kubectl get deploy
kubectl get all
kubectl get ingress
kubectl get pv
kubectl get pvc
kubectl get configmap
kubectl get secret
kubectl get hpa
kubectl get events --sort-by=.metadata.creationTimestamp
```

### Describe & Logs

```bash
kubectl describe pod <pod-name>
kubectl describe svc <service-name>
kubectl describe node <node-name>
kubectl logs <pod-name>
kubectl logs <pod-name> -c <container>
kubectl logs <pod-name> -f
kubectl logs <pod-name> --previous
```

### Exec & Debug

```bash
kubectl exec -it <pod-name> -- /bin/sh
kubectl exec -it <pod-name> -c <container> -- /bin/sh
kubectl port-forward <pod-name> 8080:80
kubectl port-forward svc/<svc-name> 8080:80
kubectl run debug --image=busybox -it --rm -- sh
```

### Scaling

```bash
kubectl scale deployment <name> --replicas=5
kubectl autoscale deployment <name> --min=2 --max=10 --cpu-percent=70
kubectl rollout status deployment <name>
kubectl rollout history deployment <name>
kubectl rollout undo deployment <name>
kubectl rollout restart deployment <name>
```

### Namespace

```bash
kubectl create namespace <name>
kubectl get ns
kubectl config set-context --current --namespace=<name>
```

### ConfigMap & Secret

```bash
kubectl create configmap <name> --from-literal=KEY=VALUE
kubectl create configmap <name> --from-file=<path>
kubectl create secret generic <name> --from-literal=PASSWORD=secret123
echo -n "value" | base64
echo "encoded" | base64 -d
```

### Labels & Selectors

```bash
kubectl get pods -l app=my-app
kubectl label pod <pod-name> env=prod
kubectl label pod <pod-name> env-
```

### Resource Usage

```bash
kubectl top nodes
kubectl top pods
kubectl top pods -n <namespace>
```

### Context & Config

```bash
kubectl config get-contexts
kubectl config current-context
kubectl config use-context <name>
```

### Quick YAML Generation (dry-run)

```bash
kubectl run my-pod --image=nginx --dry-run=client -o yaml > pod.yml
kubectl create deployment my-app --image=nginx --dry-run=client -o yaml > deploy.yml
kubectl expose deployment my-app --port=80 --dry-run=client -o yaml > svc.yml
kubectl create job my-job --image=busybox --dry-run=client -o yaml > job.yml
```

### Kind Cluster

```bash
kind create cluster --config kind-cluster-config.yml --name my-cluster
kind get clusters
kind delete cluster --name my-cluster
```
