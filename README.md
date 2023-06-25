# nextjs_express_microservices_hr_analytics
This repository contains a HR analytics application built with a microservices architecture using a combination of Redis, TypeScript, MongoDB, Next.js, React, and Express.


https://kubernetes.github.io/ingress-nginx/developer-guide/getting-started/


add to host:
```
windows:
C:\Windows\System32\drivers\etc
mac:
etc/host


127.0.0.1 hr-analytics.it
```
run  
```
skaffold dev
```

create secret for jwt token:


kubectl create secret generic jwt-secret --from-literal=jwt=salz


