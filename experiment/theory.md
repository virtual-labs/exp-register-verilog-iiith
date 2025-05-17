This page provides an overview of Verilog, its significance, and practical examples of digital design using Verilog. We will explore three fundamental designs in this experiment:

1. **T-Flip Flop**
2. **Counter**
3. **T-Flip Flop Using D-Flip Flop**

---

Verilog is a hardware description language (HDL) developed to model electronic systems. It enables designers to describe the structure and behavior of digital circuits, facilitating simulation, synthesis, and verification. The modular nature of Verilog allows for efficient design, testing, and reuse of code.

---

## 1. T-Flip Flop

The Verilog code for a T-Flip Flop is shown below, accompanied by an explanation of its components:

<p align="center">
  <img src="images/t.jpg" alt="T-Flip Flop Verilog Code">
</p>

### Key Concepts

- **Module:**  
  A module is the fundamental building block in Verilog. It can represent a single element or a collection of lower-level design blocks. Modules encapsulate functionality and expose interfaces through input and output ports, allowing for abstraction and reuse.

- **Module Name:**  
  The module name is user-defined and is used to instantiate the module elsewhere in the design. Instantiation is demonstrated in the third example.

- **Module Arguments:**  
  Similar to function arguments in C, module arguments specify the input and output ports used for communication with other modules or the external environment.

- **Input/Output Ports:**  
  These ports facilitate data transfer into and out of the module. All arguments listed in the module declaration must be defined as either input or output within the module.

- **Data Types:**  
  In this example, the `reg` data type is used. Other data types, such as `wire`, will be introduced in subsequent examples. Refer to the chart below for an overview of Verilog data types:

  <p align="center">
    <img src="images/data.jpg" alt="Verilog Data Types">
  </p>

- **Always Block:**  
  The `always` block contains statements that execute repeatedly, triggered by changes in specified signals (e.g., clock or reset).

- **Posedge Clock:**  
  The `posedge` (positive edge) of the clock triggers the execution of statements within the `always` block, corresponding to a transition from low to high voltage.

- **Negedge Reset:**  
  The `negedge` (negative edge) of the reset signal asynchronously sets the output to zero, regardless of the clock.

- **Operators and Lexical Conventions:**  
  Operators such as `~` (bitwise NOT) and `!` (logical NOT) are used in Verilog. The chart below summarizes various operators and conventions:

  <p align="center">
    <img src="images/lex.jpg" alt="Verilog Operators and Lexical Conventions">
  </p>

- **Loops:**  
  Verilog supports control structures such as `for`, `if-else`, and `while`, similar to C. These structures use `begin` and `end` to define statement blocks.

- **Blocking and Non-Blocking Assignments:**
  - **Blocking (`=`):** Statements execute sequentially.
  - **Non-Blocking (`<=`):** Statements execute concurrently.  
    For example:
    ```
    a = b;
    b = a;
    ```
    Both `a` and `b` will have the value of `b`.  
    Using non-blocking assignment:
    ```
    a <= b;
    b <= a;
    ```
    The values are swapped simultaneously.

---

## 2. Counter

The Verilog code for a counter is provided below, with explanations for each part:

<p align="center">
  <img src="images/c.jpg" alt="Counter Verilog Code">
</p>

### Additional Notes

- **Assign Statement:**  
  The `assign` keyword is used for continuous assignment. For example, `assign Q = tmp;` ensures that `Q` is updated immediately whenever `tmp` changes, regardless of execution sequence.

---

## 3. T-Flip Flop Using D-Flip Flop

The Verilog code for implementing a T-Flip Flop using a D-Flip Flop is shown below:

<p align="center">
  <img src="images/td.jpg" alt="T-Flip Flop using D-Flip Flop Verilog Code">
</p>

### Key Concepts

- **Module Instantiation:**  
  Modules are not defined within other modules; instead, they are instantiated (called) as needed. The module is referenced by its original name, but each instance must have a unique identifier. For example, the module `D_FF` is instantiated as `dff0`.

- **Verilog Primitives:**  
  Verilog provides built-in primitives such as `not`. In `not (d, q);`, `d` is the output and `q` is the input.

- **Compiler Directives and System Tasks:**  
  While not used in the above examples, Verilog supports compiler directives and system tasks for advanced functionality. Refer to the flowcharts below for more information:

  <p align="center">
    <img src="images/task.jpg" alt="Verilog System Tasks">
  </p>
  <p align="center">
    <img src="images/direc.jpg" alt="Verilog Compiler Directives">
  </p>

---

# Types of Adders

## Half Adder

<p align="center">
  <img src="images/half_adder.png" alt="Half Adder Circuit">
</p>

A half adder adds two 1-bit binary numbers, **A** and **B**, producing a 1-bit **SUM (S)** and a 1-bit **CARRY (C)**. The carry is propagated to the next bit position. The outputs can be expressed as:

- **S = A XOR B**
- **C = A AND B**

### Truth Table

| A   | B   | CARRY | SUM |
| --- | --- | ----- | --- |
| 0   | 0   | 0     | 0   |
| 0   | 1   | 0     | 1   |
| 1   | 0   | 0     | 1   |
| 1   | 1   | 1     | 0   |

---

## Full Adder

<p align="center">
  <img src="images/full_adder.png" alt="Full Adder Circuit">
</p>

A full adder adds two 1-bit binary numbers (**A** and **B**) and a carry-in (**Cin**), producing a sum (**S**) and a carry-out (**Cout**). The outputs are defined as:

- **S = A XOR B XOR Cin**
- **Cout = (A AND B) OR (Cin AND (A XOR B))**

### Truth Table

| A   | B   | Cin | Cout | S   |
| --- | --- | --- | ---- | --- |
| 0   | 0   | 0   | 0    | 0   |
| 1   | 0   | 0   | 0    | 1   |
| 0   | 1   | 0   | 0    | 1   |
| 1   | 1   | 0   | 1    | 0   |
| 0   | 0   | 1   | 0    | 1   |
| 1   | 0   | 1   | 1    | 0   |
| 0   | 1   | 1   | 1    | 0   |
| 1   | 1   | 1   | 1    | 1   |

---

## Introduction to Registers

Registers are fundamental building blocks in digital systems that store binary data. They are essentially a collection of flip-flops that can store multiple bits of information. In this experiment, we focus on a specific type of register called the Serial In Serial Out (SISO) register.

### SISO Register

A SISO register is a type of shift register where:

- Data enters the register one bit at a time (serial input)
- Data exits the register one bit at a time (serial output)
- Data moves through the register one position at each clock cycle

#### Working Principle

1. The register consists of a chain of D flip-flops
2. Each flip-flop's output is connected to the input of the next flip-flop
3. The first flip-flop receives the serial input
4. The last flip-flop provides the serial output
5. On each positive clock edge, data shifts one position to the right

#### Verilog Implementation

The SISO register is implemented using:

- A 4-bit register to store the data
- An always block triggered by the positive edge of the clock
- Non-blocking assignments for sequential logic
- A reset signal to initialize the register

#### Timing Characteristics

- Setup Time: The time before the clock edge when input data must be stable
- Hold Time: The time after the clock edge when input data must remain stable
- Clock-to-Q Delay: The time taken for the output to change after the clock edge

### Applications

SISO registers are used in:

- Serial data transmission
- Data buffering
- Time delay circuits
- Pattern recognition
- Serial-to-parallel conversion

### Verilog Concepts Used

1. Sequential Logic

   - always @(posedge clk) blocks
   - Non-blocking assignments (<=)
   - Reset signals

2. Data Types

   - reg for sequential elements
   - wire for combinational connections

3. Vector Operations

   - Bit concatenation
   - Bit slicing

4. Testbench Design
   - Clock generation
   - Reset sequence
   - Input stimulus
