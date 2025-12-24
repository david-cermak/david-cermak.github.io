Dear network,
I'm happy to share that I’ve just published *v0.11 *of the *libssh *ESP-IDF port🚀

👉https://components.espressif.com/components/david-cermak/libssh

This is still an experimental component under *my namespace (*not officially supported by Espressif), but thanks to the ESP-IDF Component Manager, it’s now super easy to use.
To spin up an SSH server on your ESP32, just run:

$ *idf.py create-project-from-example david-cermak/libssh:server*
$ *cd server *&& *idf.py build flash monitor*

🔗 GitHub repository: https://github.com/david-cermak/libssh