import { Close, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Typography,
  Container,
  Grid,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableCell,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { baseUrl } from "../../src/utils";

interface Data {}

const Index = () => {
  const [show, setShow] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    icon: undefined,
  });
  const [preview, setPreview] = React.useState<string | undefined>(undefined);

  const [loading, setLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [data, setData] = React.useState<
    Array<{
      id: string;
      name: string;
      email: string;
      profileImg: string;
      coverImg: string;
      country: string;
      region: string;
      city: string;
    }>
  >([]);

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
      //loop and create form data
      // for (let key in body) {
      //   data.append(key, body[key]);
      // }

      const response = await fetch(
        `${baseUrl}/admin/recycling/category/create`,
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
    const response = await fetch(`${baseUrl}/users`);

    const data = await response.json();
    console.log(data);
    if (data) {
      setData(data);
    }
    setLoading(false);
  };

  // delete
  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const data = await fetch(`${baseUrl}/users/delete/${id}`, {
        method: "DELETE",
      });

      console.log(await data.json());
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    // console.log("mouted");
    getCat();
  }, [refresh]);

  return (
    <Box>
      <Container maxWidth="xl">
        {/* modal  */}

        {/* hearder  */}
        <Grid container spacing={0} mb={10} justifyContent="space-between">
          <Box>
            <Typography variant="h5" color="initial">
              Registered Users
            </Typography>
          </Box>
          <Box></Box>
        </Grid>
        {/* section  */}
        <Grid container spacing={0}>
          {loading ? (
            <Typography>Loadind...</Typography>
          ) : data ? (
            <Table>
              <TableHead>
                <TableCell>#</TableCell>
                <TableCell>Profile Image</TableCell>
                <TableCell>Cover Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Region</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Options</TableCell>
              </TableHead>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <>
                    <TableBody>
                      <TableCell>{index}</TableCell>
                      <TableCell>
                        <Image
                          src={`${baseUrl}/images/categoryImages/${item.profileImg}`}
                          height={50}
                          width={50}
                          objectFit="cover"
                        />
                      </TableCell>
                      <TableCell>
                        <Image
                          src={`${baseUrl}/images/categoryImages/${item.coverImg}`}
                          height={50}
                          width={50}
                          objectFit="cover"
                        />
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.country}</TableCell>
                      <TableCell>{item.region}</TableCell>
                      <TableCell>{item.city}</TableCell>
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
                  </>
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
  );
};

export default Index;
