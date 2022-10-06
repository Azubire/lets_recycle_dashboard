import { Delete } from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Avatar,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableCell,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { baseUrl } from "../../src/utils";

interface Data {
  id: string;
  title: string;
  description: string;
  User: {
    name: string;
  };
  adImage: string;
  price: string;
  weight: string;
  status: "pending" | "complete" | "rejected";
  createdAt: string;
}

const Index = () => {
  const [show, setShow] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    icon: undefined,
  });
  const [preview, setPreview] = React.useState<string | undefined>(undefined);

  const [loading, setLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [data, setData] = React.useState<Data[]>([]);

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, icon: file }));
    console.log(file);
  };

  // image preview
  React.useEffect(() => {
    if (!formData.icon) {
      return;
    }
    const previewImg = URL.createObjectURL(formData.icon);
    setPreview(previewImg);
    return () => {
      URL.revokeObjectURL(previewImg);
    };
  }, [formData.icon]);

  const submitData = async () => {
    setLoading(true);
    setShow(false);
    if (formData.icon && formData.name) {
      const data = new FormData();
      data.append("icon", formData.icon);
      data.append("name", formData.name);

      const response = await fetch(
        "${baseUrl}/admin/recycling/category/create",
        {
          method: "POST",
          body: data,
        }
      );
      const dat = await response.json();
      if (dat) {
        setLoading(false);
        setRefresh(!refresh);
      }
      console.log("res", dat);
    }
  };

  // fetch category
  const getCat = async () => {
    setLoading(true);
    const response = await fetch(`${baseUrl}/admin/adverts`);

    const data = await response.json();
    console.log(data);
    if (data.data) {
      setData(data.data);
    }
    setLoading(false);
  };

  // delete
  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const data = await fetch(`${baseUrl}/adverts/delete/${id}`, {
        method: "DELETE",
      });

      console.log(await data.json());
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getCat();
  }, [refresh]);

  return (
    <>
      <Box>
        <Container maxWidth="lg">
          {/* modal  */}

          {/* hearder  */}
          <Grid container spacing={0} mb={10} justifyContent="space-between">
            <Box>
              <Typography variant="h5" color="initial">
                Adverts
              </Typography>
            </Box>
            <Box>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setShow(true)}
              >
                Go to requests
              </Button>
            </Box>
          </Grid>
          {/* section  */}
          <Grid
            container
            spacing={0}
            // flex="column"
          >
            {loading ? (
              <Typography>Loading</Typography>
            ) : data ? (
              <Table>
                <TableHead>
                  <TableCell>#</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Weight</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date Created</TableCell>
                  <TableCell>Options</TableCell>
                </TableHead>
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <TableBody key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {item.adImage ? (
                          <Image
                            src={`${baseUrl}/images/ads/${item.adImage}`}
                            height={50}
                            width={50}
                            objectFit="cover"
                          />
                        ) : (
                          <Avatar />
                        )}
                      </TableCell>
                      <TableCell>{item.User.name}</TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.weight}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>{item.createdAt}</TableCell>
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
