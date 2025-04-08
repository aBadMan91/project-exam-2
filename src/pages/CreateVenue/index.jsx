import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCreateData } from "../../hooks/useCreateData";

const schema = yup.object().shape({
  name: yup.string().required("Name is required").max(50, "Name cannot exceed 50 characters"),
  description: yup.string().required("Description is required"),
  media: yup.array().of(
    yup.object().shape({
      url: yup.string().url("Must be a valid URL"),
      alt: yup.string(),
    })
  ),
  price: yup.number().required("Price is required").min(0, "Price must be at least 0"),
  maxGuests: yup.number().required("Max guests is required").min(1, "Must have at least 1 guest"),
  rating: yup.number().default(0),
  meta: yup.object().shape({
    wifi: yup.boolean().default(false),
    parking: yup.boolean().default(false),
    breakfast: yup.boolean().default(false),
    pets: yup.boolean().default(false),
  }),
  location: yup.object().shape({}),
});

export function CreateVenue() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { postData } = useCreateData(token);

  const onSubmit = async (data) => {
    try {
      const createdVenue = await postData("https://v2.api.noroff.dev/holidaze/venues", data);
      console.log("Venue created:", createdVenue);
      navigate(`/venues/${createdVenue.id}`);
    } catch (error) {
      console.error("Failed to create venue:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <h1>Create Venue</h1>
      </Row>
      <Row>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Venue Name:</Form.Label>
            <Form.Control type="text" {...register("name")} isInvalid={!!errors.name} />
            <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description:</Form.Label>
            <Form.Control as="textarea" {...register("description")} isInvalid={!!errors.description} />
            <Form.Control.Feedback type="invalid">{errors.description?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="media">
            <Form.Label>Media:</Form.Label>
            <Col>
              {fields.map((field, index) => (
                <Row key={field.id} className="mb-3">
                  <Col>
                    <Form.Control type="text" placeholder="URL" {...register(`media.${index}.url`)} isInvalid={!!errors.media?.[index]?.url} />
                    <Form.Control.Feedback type="invalid">{errors.media?.[index]?.url?.message}</Form.Control.Feedback>
                  </Col>
                  <Col>
                    <Form.Control type="text" placeholder="Alt text" {...register(`media.${index}.alt`)} isInvalid={!!errors.media?.[index]?.alt} />
                    <Form.Control.Feedback type="invalid">{errors.media?.[index]?.alt?.message}</Form.Control.Feedback>
                  </Col>
                  <Col xs="auto">
                    <Button variant="danger" onClick={() => remove(index)}>
                      Remove
                    </Button>
                  </Col>
                </Row>
              ))}
              <Button variant="secondary" onClick={() => append({ url: "", alt: "" })}>
                Add Media
              </Button>
            </Col>
          </Form.Group>

          <Form.Group className="mb-3" controlId="location">
            <Form.Label>Location:</Form.Label>
            <Form.Control type="text" placeholder="Address" {...register("location.address")} isInvalid={!!errors.location?.address} />
            <Form.Control.Feedback type="invalid">{errors.location?.address?.message}</Form.Control.Feedback>
            <Form.Control type="text" placeholder="City" {...register("location.city")} isInvalid={!!errors.location?.city} />
            <Form.Control.Feedback type="invalid">{errors.location?.city?.message}</Form.Control.Feedback>
            <Form.Control type="text" placeholder="Country" {...register("location.country")} isInvalid={!!errors.location?.country} />
            <Form.Control.Feedback type="invalid">{errors.location?.country?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Col xs="4">
              <Form.Label>Price:</Form.Label>
              <Form.Control type="number" {...register("price")} isInvalid={!!errors.price} />
              <Form.Control.Feedback type="invalid">{errors.price?.message}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group className="mb-3" controlId="maxGuests">
            <Col xs="4">
              <Form.Label>Max Guests:</Form.Label>
              <Form.Control type="number" {...register("maxGuests")} isInvalid={!!errors.maxGuests} />
              <Form.Control.Feedback type="invalid">{errors.maxGuests?.message}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group className="mb-3" controlId="meta">
            <Col>
              <Form.Check type="checkbox" label="WiFi" {...register("meta.wifi")} />
              <Form.Check type="checkbox" label="Parking" {...register("meta.parking")} />
              <Form.Check type="checkbox" label="Breakfast" {...register("meta.breakfast")} />
              <Form.Check type="checkbox" label="Pets" {...register("meta.pets")} />
            </Col>
          </Form.Group>

          <Button variant="success" type="submit" className="mt-3">
            Create Venue
          </Button>
        </Form>
      </Row>
    </Container>
  );
}
