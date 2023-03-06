

install protoc: https://github.com/protocolbuffers/protobuf/releases
- add to path

## run open-match
helm install open-match --create-namespace --namespace open-match open-match/open-match --set open-match-customize.enabled=true --set open-match-customize.evaluator.enabled=true --set open-match-override.enabled=true --set backend.portType=LoadBalancer

# stop
helm uninstall -n open-match open-match && kubectl delete namespace open-match