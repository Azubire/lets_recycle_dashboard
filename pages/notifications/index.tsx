import { Close, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Modal,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  FormControlLabel,
  TextField,
  FormControl,
  InputLabel,
  FormGroup,
  Input,
  Table,
  TableHead,
  TableBody,
  TableCell,
  fabClasses,
} from "@mui/material";
import { GetServerSideProps } from "next";
import Image from "next/image";
import React from "react";
import { baseUrl } from "../../src/utils";

interface Data {
  id: string;
  title: string;
  body: string;
  avatar: string;
  status: boolean;
  User: {
    name: string;
  };
  Recycler: {
    companyName: string;
  };
}

const Index = () => {
  const [show, setShow] = React.useState(false);

  const [preview, setPreview] = React.useState<string | undefined>(undefined);

  const [loading, setLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [data, setData] = React.useState<Data[]>([]);

  // fetch category
  const getCat = async () => {
    setLoading(true);
    const response = await fetch(`${baseUrl}/notifications`);

    const data = await response.json();
    console.log(data);
    if (data.data) {
      setData(data.data);
    }
    setLoading(false);
  };

  // delete
  const handleDelete = async (id: string) => {
    try {
      const data = await fetch(`${baseUrl}/notifications/delete/${id}`, {
        method: "DELETE",
      });

      console.log(await data.json());
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    console.log("mouted");
    getCat();
  }, [refresh]);

  return (
    <>
      <Box>
        <Container maxWidth="lg">
          {/* hearder  */}
          <Grid container spacing={0} mb={10} justifyContent="space-between">
            <Box>
              <Typography variant="h5" color="initial">
                Notifications
              </Typography>
            </Box>
            <Box></Box>
          </Grid>
          {/* section  */}
          <Grid
            container
            spacing={0}
            // flex="column"
          >
            {data ? (
              <Table>
                <TableHead>
                  <TableCell>#</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Body</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Options</TableCell>
                </TableHead>
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <TableBody key={index + item.id}>
                      <TableCell>{index}</TableCell>
                      <TableCell>
                        {item.avatar ? (
                          <Image
                            src={`${baseUrl}/images/categoryImages/${item.avatar}`}
                            height={50}
                            width={50}
                            objectFit="cover"
                          />
                        ) : (
                          <Avatar />
                        )}
                      </TableCell>
                      <TableCell>{item.User?.name}</TableCell>
                      <TableCell>
                        {item.Recycler ? item.Recycler.companyName : "null"}
                      </TableCell>

                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.body}</TableCell>
                      <TableCell>{item.status ? "Read" : "Unread"}</TableCell>
                      <TableCell>
                        <Grid container spacing={1}>
                          {/* <Grid item>
                          <IconButton>
                            <Edit color="info" />
                          </IconButton>
                        </Grid> */}
                          <Grid item>
                            <IconButton
                              onClick={() => handleDelete(item.id.toString())}
                            >
                              <Delete color="error" />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableBody>
                  ))
                ) : (
                  <Typography>Loading...</Typography>
                )}
              </Table>
            ) : (
              <Typography variant="body1" color="initial">
                No data to show
              </Typography>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Index;
