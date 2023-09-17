shopt -s extglob
scp -r !(node_modules) .next .env root@103.143.207.170:/opt/frontend/client

ssh root@103.143.207.170 "source ~/.bash_profile; cd /opt/frontend/client && ./run_on_server.sh"
# 4Gd%FSuABA29
# scp -r src/pages/chi-tiet-tin-tuc/[slug].js root@103.143.207.170:/opt/frontend/client/src/pages/chi-tiet-tin-tuc/[slug].js