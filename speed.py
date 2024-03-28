# speed.py
import speedtest

def main():
    st = speedtest.Speedtest()
    st.get_best_server()

    download_speed = st.download() / 1024 / 1024  # in Megabit pro Sekunde
    upload_speed = st.upload() / 1024 / 1024  # in Megabit pro Sekunde

    result = f"Download Speed: {download_speed:.2f} Mbps\nUpload Speed: {upload_speed:.2f} Mbps  \n\n By Baron"

    print(result)

if __name__ == "__main__":
    main()
