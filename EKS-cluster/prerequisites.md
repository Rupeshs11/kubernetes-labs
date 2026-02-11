# 📌 Prerequisites — Three-Tier Application on AWS EKS

> Complete all sections below before starting the deployment. This ensures a smooth and repeatable setup.

---

## 1. AWS Account Requirements

- An **active AWS account**
- IAM user with **programmatic access** (Access Key + Secret Key)
- Required IAM permissions:

| Service        | Purpose                         |
| -------------- | ------------------------------- |
| EKS            | Cluster creation and management |
| EC2            | Worker nodes                    |
| VPC            | Networking                      |
| IAM            | Roles and policies              |
| ECR            | Container image registry        |
| ELB            | Load balancing                  |
| CloudFormation | Infrastructure provisioning     |

> **💡 Tip:** Use an **AdministratorAccess** or **PowerUserAccess** policy for practice environments.

---

## 2. Local / EC2 Environment

You can work from **your local machine** or an **EC2 instance** (recommended for beginners).

**If using EC2:**

| Setting        | Value                                 |
| -------------- | ------------------------------------- |
| Instance type  | `t3.small` or higher                  |
| OS             | Amazon Linux 2                        |
| Security Group | SSH (22) from your IP, HTTP (80) open |

---

## 3. AWS CLI

**Install:**

```bash
sudo yum install aws-cli -y
```

**Configure:**

```bash
aws configure
```

You will be prompted for:

| Field             | Example     |
| ----------------- | ----------- |
| Access Key ID     | `AKIA...`   |
| Secret Access Key | `wJal...`   |
| Default Region    | `us-east-1` |
| Output Format     | `json`      |

**Verify:**

```bash
aws sts get-caller-identity
```

---

## 4. Docker

**Install:**

```bash
sudo yum install docker -y
sudo systemctl start docker
sudo usermod -aG docker ec2-user
newgrp docker
```

**Verify:**

```bash
docker --version
```

---

## 5. kubectl (Kubernetes CLI)

**Install:**

```bash
curl -O https://s3.us-west-2.amazonaws.com/amazon-eks/1.27.4/2023-09-14/bin/linux/amd64/kubectl
chmod +x kubectl
sudo mv kubectl /usr/local/bin/
```

**Verify:**

```bash
kubectl version --client
```

---

## 6. eksctl

**Install:**

```bash
curl --silent --location \
  "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" \
  | tar xz -C /tmp

sudo mv /tmp/eksctl /usr/local/bin
```

**Verify:**

```bash
eksctl version
```

---

## 7. Helm (Kubernetes Package Manager)

**Install:**

```bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

**Verify:**

```bash
helm version
```

---

## 8. Node.js & npm (for Frontend Build)

- Required version: **Node.js 16.x**

**Check:**

```bash
node -v
npm -v
```

> **📝 Note:** If building images inside Docker only, local Node.js installation is optional.

---

## 9. Amazon ECR (Container Registry)

Ensure two ECR repositories are created:

| Repository      | Purpose                   |
| --------------- | ------------------------- |
| `frontend-repo` | Frontend container images |
| `backend-repo`  | Backend container images  |

**Verify:**

```bash
aws ecr describe-repositories
```

---

## 10. Kubernetes Knowledge (Basic)

You should be comfortable with the following concepts:

- Pods
- Deployments
- Services
- Ingress
- Namespaces
- Secrets
- ConfigMaps

---

## 11. Networking Basics

Understanding required for:

- **VPC** — Virtual Private Cloud
- **Subnets** — Public and Private
- **Security Groups** — Firewall rules
- **Load Balancers** — Application Load Balancer (ALB)

---

> ✅ Once all prerequisites are met, you're ready to proceed with the [deployment guide](./README.md).
