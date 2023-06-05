// enum Action {
//     create = "create",
//     update = "update",
//     delete = "delete"
// }

// type Props = {
//     data: {}[]
//     action: Action,
//     newData: {}
// }

// export default async function useOptimistic_UI({ data, newData, action }: Props) {
//     switch (action) {
//         case "create":
//             const newDataHere = [...data, newData];

//             const mutateTodo = async () => {
//                 return await addTodo(input);
//             };

//             const mutateOptions = {
//                 optimisticData: newDataHere,
//                 rollbackOnError: true,
//                 populateCache: true,
//                 revalidate: false,
//             };

//             try {
//                 await mutate(mutateTodo(), mutateOptions);
//                 toast({
//                     title: "Tersimpan",
//                     description: "Friday, February 10, 2023 at 5:57 PM",
//                 });
//             } catch (error) {
//                 toast({
//                     title: "Gagal Tersimpan",
//                     description: "Friday, February 10, 2023 at 5:57 PM",
//                 });
//             }
//             break;
//         case "update":

//             break;
//         case "delete":

//             break;

//         default:
//             break;
//     }
//     return {}
// }