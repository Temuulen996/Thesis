import * as Native from "react-native";
import Eappbar from "../../components/general/eappbar";
import { FAB, Modal, Portal, TextInput } from "react-native-paper";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Camera, CameraType } from "expo-camera/legacy";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL, PRODUCTION_API_URL } from "../../config/config";
import Ebutton from "../../components/general/ebutton";
import { Picker } from "@react-native-picker/picker";
import { useIsFocused } from "@react-navigation/native";
import ClothesContext from "../../context/clothes_context";
import { FontAwesome6 } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import UserContext from "../../context/user_context";
import GlobalContext from "../../context/global_context";
import { showMessage } from "react-native-flash-message";
import { MaterialIcons } from "@expo/vector-icons";
interface FormData {
  name: string;
  category: string;
  size: string;
  gender: string;
  price: string;
  rating: string;
  used_month: string;
  description: string;
  images: string[];
}
interface ImageData {
  uri: string;
  type: string;
  name: string;
}
interface SizeOption {
  key: string;
  value: string;
}
export default (props: any) => {
  const [categoryModal, setCategoryModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: null,
    category: null,
    size: null,
    gender: null,
    price: null,
    rating: null,
    used_month: null,
    description: null,
    images: [],
  });
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const [categories, setCategories] = useState<any | null>([]);
  const isFocused = useIsFocused();
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const sizeOptions = [
    { value: "Small", key: "S" },
    { value: "Medium", key: "M" },
    { value: "Large", key: "L" },
    { value: "Extra large", key: "XXL" },
    { value: "2X large", key: "XXL" },
  ];
  const genderOptions = [
    {
      value: "Эрэгтэй",
      key: "M",
    },
    {
      value: "Эмэгтэй",
      key: "FM",
    },
    {
      value: "Хоёулаа өмсөх боломжтой",
      key: "BTH",
    },
  ];
  const clCtx = useContext(ClothesContext);
  const usCtx = useContext(UserContext);
  const glCtx = useContext(GlobalContext);
  useEffect(() => {
    console.log("easddas");
    if (isFocused) {
      clCtx.loadCategories();
      clCtx.loadClothes();
    }
  }, [isFocused]);
  useEffect(() => {
    // console.log(object)
    // if (isFocused) {
    // }
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      console.log("🚀 ~ status:", status);

      setHasPermission(status === "granted");
    })();
  }, []);
  useEffect(() => {
    const cate = clCtx.state.categories?.map?.((item: any) => ({
      key: item._id,
      value: item.name,
    }));

    setCategories(cate);
  }, [clCtx.state.categories]);
  // name: null,
  // category: null,
  // size: null,
  // gender: null,
  // price: null,
  // rating: null,
  // used_month: null,
  // description: null,
  // images: [],
  const store = async () => {
    glCtx.setLoadingReq(true);

    if (
      formData.name &&
      formData.name != "" &&
      formData.category &&
      formData.category != "" &&
      formData.size &&
      formData.size != "" &&
      formData.gender &&
      formData.gender != "" &&
      formData.price &&
      formData.price != "" &&
      formData.rating &&
      formData.rating != "" &&
      formData.used_month &&
      formData.used_month != "" &&
      formData.description &&
      formData.description != "" &&
      formData.images &&
      formData.images?.length > 0
    ) {
      const token = await AsyncStorage.getItem("token");
      const formBodyData = new FormData();

      formBodyData.append("name", formData.name);
      formBodyData.append("category_id", formData.category);
      formBodyData.append("price", formData.price);
      formBodyData.append("rating", formData.rating);
      formBodyData.append("used_month", formData.used_month);
      formBodyData.append("description", formData.description);
      formBodyData.append("gender", formData.gender);
      formBodyData.append("size", formData.size);
      formBodyData.append("type", "mobile");
      if (formData.images) {
        for (let i = 0; i < formData.images.length; i++) {
          formBodyData.append("images", formData.images[i]);
        }
      }

      try {
        await axios.post(
          `${
            process.env.NODE_ENV === "production" ? PRODUCTION_API_URL : API_URL
          }/api/clothes`,
          formBodyData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // .catch((err) => {
        //   console.log(err); //oorchil
        // });
        setFormData({
          name: null,
          category: null,
          price: null,
          description: null,
          rating: null,
          used_month: null,
          images: [],
          size: null,
          gender: null,
        });
        showMessage({ message: "Амжилттай үүсгэлээ!", type: "success" });
        glCtx.setLoadingReq(false);
      } catch (err) {
        console.log(err);
        showMessage({ message: "Алдаа гарлаа!", type: "danger" });
        glCtx.setLoadingReq(false);
      }
    } else {
      glCtx.setLoadingReq(false);
      showMessage({ message: "Талбарыг бүрэн бөглөнө үү!", type: "danger" });
    }

    // toast.success("Бүтээгдэхүүнийг амжилттай бүртгэлээ.");
    // glCtx.setLoadingReq(false);
  };
  const removePicture = (base64: string): void => {
    const newPictureArr = formData.images?.filter?.(
      (elem, i) => elem != base64
    );

    setFormData((prev) => {
      return {
        ...prev,
        images: newPictureArr,
      };
    });
  };

  const takePicture = async () => {
    console.log("dsadsadsa");
    if (cameraRef) {
      const options = { quality: 0.7, base64: true };
      const data = await cameraRef.takePictureAsync(options);

      setFormData((prev) => {
        const newImages = prev?.images;
        newImages.push(data?.base64);

        return {
          ...prev,
          images: newImages,
        };
      });
    }
  };

  const handleRatingInputChange = (value: string) => {
    const num = parseFloat(value);

    if (!isNaN(num) && num >= 0 && num <= 100) {
      setFormData((prev) => {
        return { ...prev, rating: value };
      });
    } else if (value === "") {
      setFormData((prev) => {
        return { ...prev, rating: value };
      });
    }
  };
  //categorymodal
  const [category, setCategory] = useState<string | null>(null);
  const handleInsertCategory = async () => {
    if (!category || category === "") {
      return showMessage({
        message: "Талбарыг бүрэн бөглөнө үү!",
        type: "warning",
      });
    }
    try {
      const token = await AsyncStorage.getItem("emp_token");
      const categoryRes = await axios.post(
        `${
          process.env.NODE_ENV === "production" ? PRODUCTION_API_URL : API_URL
        }/api/category`,
        { name: category },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCategory(null);
      setCategoryModal(false);
      showMessage({
        message: "Төрөл амжилттай бүртгэгдлээ.",
        type: "success",
      });
      setCategory(null);
    } catch (err: any) {
      showMessage({
        message: "Алдаа гарлаа",
        type: "danger",
      });
      console.log(err);
    }
  };
  const HideCategoryModal = () => {
    setCategoryModal(false);
  };
  //categorymodal
  if (!permission) {
    return <Native.View />;
  }
  if (!permission.granted) {
    return (
      <Native.View>
        <Native.Text>Camera зөвшөөрөгдөөгүй байна.</Native.Text>
      </Native.View>
    );
  }

  return (
    <Fragment>
      <Portal>
        <Modal
          visible={categoryModal}
          onDismiss={HideCategoryModal}
          contentContainerStyle={styles.containerStyle}
        >
          <Native.View className="px-3">
            <TextInput
              label="Шинээр хувцасны төрөл нэмэх.."
              value={category}
              onChangeText={(text) => setCategory(text)}
              className="my-2"
            />
            <Ebutton
              icon={<FontAwesome6 name="add" size={24} color="white" />}
              classNamee=""
              label="Төрөл Нэмэх"
              func={(): void => {
                handleInsertCategory();
              }}
            />
          </Native.View>
        </Modal>
      </Portal>
      <Eappbar
        title="Нүүр"
        logout
        back={undefined}
        logo={true}
        cart={undefined}
        onBackPress={undefined}
        navigation={undefined}
      />
      <Native.ScrollView className="py-2 px-3">
        <Native.Text className="font-bold text-2xl text-center my-2">
          Хувцас нэмэх
        </Native.Text>
        <TextInput
          value={formData.name}
          className="my-2"
          label="Нэр"
          onChangeText={(text) => {
            setFormData((prev) => {
              return {
                ...prev,
                name: text,
              };
            });
          }}
        />
        <Native.View className="my-2">
          <SelectList
            boxStyles={{
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              backgroundColor: "#e7e0ec",
              borderWidth: 0,
            }}
            placeholder="Ангилал сонгоно уу."
            onSelect={() => {}}
            setSelected={(val: string) =>
              setFormData((prev) => {
                return { ...prev, category: val };
              })
            }
            data={categories || []}
            defaultOption={{ key: "", value: "" }}
          />
        </Native.View>

        <Native.View className="my-2">
          <SelectList
            boxStyles={{
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              backgroundColor: "#e7e0ec",
              borderWidth: 0,
            }}
            placeholder="Хэмжээ сонгоно уу."
            onSelect={() => {}}
            setSelected={(val: string) =>
              setFormData((prev) => {
                return { ...prev, size: val };
              })
            }
            data={sizeOptions || []}
            defaultOption={{ key: "", value: "" }}
          />
        </Native.View>
        <Native.View className="my-2">
          <SelectList
            boxStyles={{
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              backgroundColor: "#e7e0ec",
              borderWidth: 0,
            }}
            placeholder="Хүйс сонгоно уу."
            onSelect={() => {}}
            setSelected={(val: string) =>
              setFormData((prev) => {
                return { ...prev, gender: val };
              })
            }
            data={genderOptions || []}
            defaultOption={{ key: "", value: "" }}
          />
        </Native.View>
        <TextInput
          className="my-2"
          label="Үнэ"
          value={formData.price}
          keyboardType="numeric"
          onChangeText={(text) => {
            setFormData((prev) => {
              return {
                ...prev,
                price: text,
              };
            });
          }}
        />
        <TextInput
          className="my-2"
          value={formData.rating}
          label="Үнэлгээ"
          keyboardType="numeric"
          onChangeText={(text) => {
            handleRatingInputChange(text);
          }}
        />
        <TextInput
          className="my-2"
          value={formData.used_month}
          label="Ашигласан сар"
          keyboardType="numeric"
          onChangeText={(text) => {
            setFormData((prev) => {
              return {
                ...prev,
                used_month: text,
              };
            });
          }}
        />
        <Native.View></Native.View>
        <TextInput
          label="Хувцасны мэдээлэл"
          value={formData.description}
          onChangeText={(text) =>
            setFormData((prev) => {
              return {
                ...prev,
                description: text,
              };
            })
          }
          className="my-2"
        />
        <Native.View className="my-2">
          <Camera
            style={styles.camera}
            // ref={(ref) => setCameraRef(ref)}
            type={CameraType.back}
            ref={setCameraRef}
          >
            <Native.TouchableOpacity
              onPress={takePicture}
              className="  m-auto"
              style={styles.buttonContainer}
            >
              <Native.View className="text-white text-xl h-10 w-10 bg-white rounded-3xl" />
            </Native.TouchableOpacity>
          </Camera>
          <Native.ScrollView horizontal>
            {formData?.images.map?.((base64Image, i) => (
              <Native.TouchableOpacity
                key={i}
                delayLongPress={900}
                onLongPress={() => {
                  removePicture(base64Image);
                }}
              >
                <Native.Image
                  source={{ uri: `data:image/png;base64, ${base64Image}` }}
                  style={styles.preview}
                />
              </Native.TouchableOpacity>
            ))}
          </Native.ScrollView>
        </Native.View>
        <Ebutton
          icon={<MaterialIcons name="save-alt" size={24} color="white" />}
          label="Хадгадах"
          func={() => {
            store();
          }}
          classNamee="mt-2 mb-4 mx-10"
        />
      </Native.ScrollView>
      <FAB
        icon="toy-brick-plus"
        className="absolute m-4 right-0 bottom-0 "
        onPress={() => setCategoryModal(true)}
      />
    </Fragment>
  );
};
const styles = Native.StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    height: 300,
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  preview: {
    width: 100,
    height: 100,
    marginTop: 5,
    marginRight: 5,
  },
  containerStyle: { backgroundColor: "white", padding: 20 },
});
