import * as React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "../src/Link";
import Button from "@mui/material/Button";
import { Avatar, Grid, Paper } from "@mui/material";
import {
  Category,
  Loop,
  MarkEmailReadOutlined,
  NotificationAdd,
  VerifiedUser,
  VerifiedUserSharp,
} from "@mui/icons-material";
import { green, lightBlue, pink, red, yellow } from "@mui/material/colors";
import { GetStaticProps } from "next";
import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import { baseUrl } from "../src/utils";

interface pageProps {
  data: {
    users: number;
    recyclers: number;
    recyclingcategories: number;
    adverts: number;
    notifications: number;
  };
}
interface dataTypes {
  id: number;
  name: string;
  number: number;
  to: string;
  icon: EmotionJSX.Element;
  color: string;
}

const Home = (props: pageProps) => {
  const stateData: dataTypes[] = [
    {
      id: 1,
      name: "users",
      number: props.data.users,
      to: "/users",
      icon: <VerifiedUser fontSize="large" sx={{ color: green[700] }} />,
      color: green[700],
    },
    {
      id: 2,
      name: "recyclers",
      number: props.data.recyclers,
      to: "/recyclers",
      icon: <Loop fontSize="large" sx={{ color: yellow[700] }} />,
      color: yellow[700],
    },
    {
      id: 3,
      name: "adverts",
      number: props.data.adverts,
      to: "/adverts",
      icon: (
        <MarkEmailReadOutlined fontSize="large" sx={{ color: pink[700] }} />
      ),
      color: pink[700],
    },
    {
      id: 4,
      name: "categories",
      number: props.data.recyclingcategories,
      to: "/recycling/categories",
      icon: <Category fontSize="large" sx={{ color: red[700] }} />,
      color: red[700],
    },
    {
      id: 4,
      name: "notifications",
      number: props.data.notifications,
      to: "/notifications",
      icon: <NotificationAdd fontSize="large" />,
      color: "",
    },
  ];
  const [state, setState] = React.useState<dataTypes[]>([]);
  React.useEffect(() => {
    // console.log(state);
    setState(stateData);
  }, [props]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {state.map((item, index) => (
          <Grid key={item.id + index} item xs={12} md={4}>
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                py: 2,
                // borderTop: 8,
                // borderTopColor: item.color,
                borderBottom: 6,
                borderBottomColor: item.color,
                height: "100%",
              }}
            >
              {item.icon}
              <Typography variant="h6" my={4}>
                Number of {item.name} : {item.number}
              </Typography>
              <Button
                LinkComponent={Link}
                href={item.to}
                variant="outlined"
                sx={{ borderColor: item.color, color: item.color }}
              >
                View
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const response = await fetch(`${baseUrl}/dashboard`);

    const newData = await response.json();

    return {
      props: {
        data: newData.data,
      },
    };
  } catch (error) {
    // console.log(error);
    return {
      props: {},
    };
  }
};

export default Home;
