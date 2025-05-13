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