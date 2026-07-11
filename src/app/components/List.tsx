import { createContext, PropsWithChildren, useContext } from "react";
import { Text } from "react-native";

interface ListProps extends PropsWithChildren {}

interface ListContextProps {
  itemCount: number;
}

const ListContext = createContext<ListContextProps | null>(null);

const List = ({ children }: ListProps) => {
  return (
    <ListContext.Provider value={{ itemCount: 1 }}>
      {children}
    </ListContext.Provider>
  );
};

const Header = (props: { title: string }) => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error("List.Header must be used within a List component");
  }
  const { itemCount } = context;
  return (
    <Text>
      {props.title} - {itemCount}
    </Text>
  );
};

const item = (props: { title: string }) => {
  return <Text>{props.title}</Text>;
};
List.header = Header;
List.item = item;

export default List;
