// Initial setup
resetArray();

document.addEventListener("DOMContentLoaded", function () {
  resetArray();
});
// Generate an array of random heights for bars
function generateArray(size) {
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * 300) + 10
  );
}

// Display the array as bars in the container
function displayArray(array) {
  const arrayContainer = document.getElementById("array-container");
  arrayContainer.innerHTML = "";

  array.forEach((height) => {
    const bar = document.createElement("div");
    bar.style.height = `${height}px`;
    bar.className = "bar";
    arrayContainer.appendChild(bar);
  });
}

// Swap elements in the array
function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

// Bubble Sort algorithm
async function bubbleSort(array) {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Highlight bars being compared
      const bars = document.querySelectorAll(".bar");
      bars[j].style.backgroundColor = "#e74c3c";
      bars[j + 1].style.backgroundColor = "#e74c3c";

      // Delay to visualize the comparison
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Compare and swap if necessary
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
        displayArray(array);
      }

      // Reset bar colors
      bars[j].style.backgroundColor = "#3498db";
      bars[j + 1].style.backgroundColor = "#3498db";
    }
  }
}
// Visualize the Merge Sort algorithm
async function visualizeMergeSort() {
  const array = Array.from(document.querySelectorAll(".bar"), (bar) =>
    parseInt(bar.style.height)
  );
  await mergeSort(array, 0, array.length - 1);
}

// Visualize the Quick Sort algorithm
async function visualizeQuickSort() {
  const array = Array.from(document.querySelectorAll(".bar"), (bar) =>
    parseInt(bar.style.height)
  );
  await quickSort(array, 0, array.length - 1);
}

// Add these functions to visualize Selection Sort and Insertion Sort
async function visualizeSelectionSort() {
  const array = Array.from(document.querySelectorAll(".bar"), (bar) =>
    parseInt(bar.style.height)
  );
  await selectionSort(array);
}

async function visualizeInsertionSort() {
  const array = Array.from(document.querySelectorAll(".bar"), (bar) =>
    parseInt(bar.style.height)
  );
  await insertionSort(array);
}
async function visualizeShellSort() {
  const array = Array.from(document.querySelectorAll(".bar"), (bar) =>
    parseInt(bar.style.height)
  );
  await shellSort(array);
}

// Shell Sort algorithm
async function shellSort(array) {
  const n = array.length;
  let gap = Math.floor(n / 2);

  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      const currentElement = array[i];
      let j = i;

      // Highlight the current element
      const bars = document.querySelectorAll(".bar");
      bars[j].style.backgroundColor = "#e74c3c";

      // Delay to visualize the comparison
      await new Promise((resolve) => setTimeout(resolve, 100));

      while (j >= gap && array[j - gap] > currentElement) {
        // Highlight bars being compared
        bars[j].style.backgroundColor = "#3498db";
        bars[j - gap].style.backgroundColor = "#3498db";

        // Delay to visualize the comparison
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Swap elements
        array[j] = array[j - gap];
        displayArray(array);

        // Reset color of the compared bars
        bars[j].style.backgroundColor = "#e74c3c";
        bars[j - gap].style.backgroundColor = "#e74c3c";

        j -= gap;
      }

      // Place the current element in its correct position
      array[j] = currentElement;
      displayArray(array);

      // Reset color of the current element
      bars[j].style.backgroundColor = "#3498db";
    }

    gap = Math.floor(gap / 2);
  }
}

// Merge Sort algorithm
async function mergeSort(array, start, end) {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);

    // Recursively sort the left and right halves
    await mergeSort(array, start, mid);
    await mergeSort(array, mid + 1, end);

    // Merge the sorted halves
    await merge(array, start, mid, end);
  }
}

// Merge function for Merge Sort
async function merge(array, start, mid, end) {
  const n1 = mid - start + 1;
  const n2 = end - mid;

  // Create temporary arrays
  const leftArray = array.slice(start, start + n1);
  const rightArray = array.slice(mid + 1, mid + 1 + n2);

  let i = 0,
    j = 0,
    k = start;

  // Merge the two arrays
  while (i < n1 && j < n2) {
    // Highlight bars being compared
    const bars = document.querySelectorAll(".bar");
    bars[start + i].style.backgroundColor = "#e74c3c";
    bars[mid + 1 + j].style.backgroundColor = "#e74c3c";

    // Delay to visualize the comparison
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Compare and merge
    if (leftArray[i] <= rightArray[j]) {
      array[k] = leftArray[i];
      i++;
    } else {
      array[k] = rightArray[j];
      j++;
    }

    // Reset bar colors
    bars[start + i - 1].style.backgroundColor = "#3498db";
    bars[mid + 1 + j - 1].style.backgroundColor = "#3498db";

    // Update the displayed array
    displayArray(array);

    k++;
  }

  // Copy the remaining elements of leftArray, if any
  while (i < n1) {
    array[k] = leftArray[i];
    i++;
    k++;
    displayArray(array);
  }

  // Copy the remaining elements of rightArray, if any
  while (j < n2) {
    array[k] = rightArray[j];
    j++;
    k++;
    displayArray(array);
  }
}

// Quick Sort algorithm
async function quickSort(array, low, high) {
  if (low < high) {
    const partitionIndex = await partition(array, low, high);

    // Recursively sort the elements before and after the partition
    await quickSort(array, low, partitionIndex - 1);
    await quickSort(array, partitionIndex + 1, high);
  }
}

// Partition function for Quick Sort
async function partition(array, low, high) {
  const pivot = array[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    // Highlight bars being compared
    const bars = document.querySelectorAll(".bar");
    bars[j].style.backgroundColor = "#e74c3c";
    bars[high].style.backgroundColor = "#e74c3c";

    // Delay to visualize the comparison
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Compare and swap if necessary
    if (array[j] < pivot) {
      i++;
      swap(array, i, j);
      displayArray(array);
    }

    // Reset bar colors
    bars[j].style.backgroundColor = "#3498db";
    bars[high].style.backgroundColor = "#3498db";
  }

  // Swap the pivot element with the element at (i+1)
  swap(array, i + 1, high);
  displayArray(array);

  return i + 1;
}
// Selection Sort algorithm
async function selectionSort(array) {
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    // Highlight the current minimum
    const bars = document.querySelectorAll(".bar");
    bars[i].style.backgroundColor = "#e74c3c";

    // Delay to visualize the comparison
    await new Promise((resolve) => setTimeout(resolve, 100));

    for (let j = i + 1; j < n; j++) {
      // Highlight bars being compared
      bars[j].style.backgroundColor = "#3498db";

      // Delay to visualize the comparison
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Compare and update minIndex if necessary
      if (array[j] < array[minIndex]) {
        // Reset color of the previous minimum
        bars[minIndex].style.backgroundColor = "#3498db";

        minIndex = j;

        // Highlight the new minimum
        bars[minIndex].style.backgroundColor = "#e74c3c";
      } else {
        // Reset color of the current bar
        bars[j].style.backgroundColor = "#3498db";
      }
    }

    // Swap the found minimum element with the first element
    if (minIndex !== i) {
      swap(array, i, minIndex);
      displayArray(array);
    }

    // Reset color of the current minimum
    bars[minIndex].style.backgroundColor = "#3498db";
  }
}

// Insertion Sort algorithm
async function insertionSort(array) {
  const n = array.length;

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    // Highlight the current key
    const bars = document.querySelectorAll(".bar");
    bars[i].style.backgroundColor = "#e74c3c";

    // Delay to visualize the comparison
    await new Promise((resolve) => setTimeout(resolve, 100));

    while (j >= 0 && array[j] > key) {
      // Highlight bars being compared
      bars[j].style.backgroundColor = "#3498db";
      bars[j + 1].style.backgroundColor = "#3498db";

      // Delay to visualize the comparison
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Move elements greater than key one position ahead
      array[j + 1] = array[j];
      displayArray(array);

      // Reset color of the compared bars
      bars[j].style.backgroundColor = "#3498db";
      bars[j + 1].style.backgroundColor = "#3498db";

      j--;
    }

    // Place the key in its correct position
    array[j + 1] = key;
    displayArray(array);

    // Reset color of the current key
    bars[i].style.backgroundColor = "#3498db";
  }
}

// Generate a new array and display it
function changeSize() {
  const newSize = document.getElementById("size").value;
  resetArray(newSize);
}

// Updated resetArray function to accept a size parameter
function resetArray(size = 20) {
  const newArray = generateArray(size);
  displayArray(newArray);
}

// Visualize the Bubble Sort algorithm
async function visualizeBubbleSort() {
  const array = Array.from(document.querySelectorAll(".bar"), (bar) =>
    parseInt(bar.style.height)
  );
  await bubbleSort(array);
}
