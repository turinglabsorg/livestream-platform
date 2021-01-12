# Simple livestream platform

This platform is intended to be used with [OBS](https://obsproject.com/) and [Restream](https://restream.io/) or [Youtube](https://studio.youtube.com).

Frontend will show a simple webpage where you can setup the embed video link. 

Live stream is protected by a login so you can simply sell or share your live streams.

## Install your own relay server

```
sudo apt install nginx
sudo add-apt-repository universe && sudo apt install libnginx-mod-rtmp
mkdir -p /etc/nginx/rtmp.d
```

Then add this to `/etc/nginx/nginx.conf`:

```
rtmp {
    include /etc/nginx/rtmp.d/*;
}
```

Now create `/etc/nginx/rtmp.d/hls` with:

```
server {
    listen 1935;
    ping 30s;
    notify_method get;

    application live {
        live on;

        # sample HLS
        hls on;
        hls_path /tmp/hls;
        hls_sync 2400ms;
        hls_fragment 6s;
        hls_playlist_length 60;
        allow play all;
    }
}
```

Now substitute `/etc/nginx/sites-available/default` with:

```
server {
    listen 80;
    listen [::]:80;
    server_name ilmioserver.it;

    root /var/www/html;

    location / {
        index index.html;
    }

    location /hls {
        # Disable cache
        add_header Cache-Control no-cache;

        # CORS setup
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Expose-Headers' 'Content-Length';

        # allow CORS preflight requests
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain charset=UTF-8';
            add_header 'Content-Length' 0;
            return 204;
        }

        types {
            application/vnd.apple.mpegurl m3u8;
            video/mp2t ts;
        }

        root /tmp;
    }

    # rtmp stat
    location /stats {
        rtmp_stat all;
        rtmp_stat_stylesheet stat.xsl;
    }

    # rtmp control
    location /control {
        rtmp_control all;
    }
}
```


And reload `nginx` with:

```
sudo systemctl restart nginx
```