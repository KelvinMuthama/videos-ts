import { SimpleGrid } from "@mantine/core";
import Head from "next/head";
import Image from "next/image";
import { ReactElement } from "react";
import styles from "../styles/Home.module.css";
import HomePageLayout from "../layout/Home";
import { useVideo } from "../context/videos";
import VideoTeaser from "../components/VideoTeaser";

export default function Home() {
  const { videos } = useVideo();
  return (
    <div className={styles.container}>
      <SimpleGrid cols={3}>
        {(videos || []).map((video) => {
          return <VideoTeaser key={video.videoId} video={video} />;
        })}
      </SimpleGrid>
    </div>
  );
}

Home.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};
