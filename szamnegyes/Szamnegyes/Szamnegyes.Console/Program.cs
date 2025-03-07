using Szamnegyes;

int[][] table = [
  [1,2,1],
  [2,4,2],
  [1,2,1]
];
int[] val = Table.valid(table);
Console.WriteLine(string.Join(", ", val));


int[][] table2 = [
  [3,7,4],
  [5,16,11],
  [2,9,7]
];
int[] val2 = Table.valid(table2);
Console.WriteLine(string.Join(", ", val2));