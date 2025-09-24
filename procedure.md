> **Important Note:** This simulation is designed for desktop view only. For the best experience, please use a desktop monitor with a minimum resolution of 1280x720 pixels. The simulation may not function properly on smaller screens like mobile devices or tablets.

### 1. Understanding the Simulation

This simulation helps you learn about two types of registers in Verilog:

- **Parallel Register:** A register that can load multiple bits simultaneously.
- **Shift Register:** A register that shifts data one bit at a time.

### 2. Getting Started

1. Select the type of register you want to work with using the tabs at the top of the simulation.
2. Enter your module name and testbench name in the respective fields:
   - Module names must follow [Verilog naming conventions](https://www.chipverify.com/verilog/verilog-syntax).
   - Only letters, numbers, and underscores are allowed (no hyphens or special characters).
   - Testbench name must end with '\_tb'.

### 3. Building the Verilog Module

1. In the first column, arrange the code blocks in the correct order by dragging and dropping them.
2. Select the appropriate signals from the dropdown menus:
   - For Parallel Register: `clk`, `rst`, `d[3:0]`, `q[3:0]`
   - For Shift Register: `clk`, `rst`, `d`, `q`
3. Choose the correct reset condition and value.
4. Select the appropriate output assignment logic.

### 4. Creating the Testbench

1. In the second column, arrange the testbench code blocks in the correct order.
2. Define the testbench signals:
   - For Parallel Register: `reg clk, rst, d[3:0]; wire q[3:0]`
   - For Shift Register: `reg clk, rst, d; wire q`
3. Connect the ports correctly in the module instantiation.

### 5. Validation and Observation

1. Click the "Validate" button to check your code.
2. The observation column will show:
   - Error messages in red if there are mistakes. Refer to the [Troubleshooting](#6-troubleshooting) section below for dealing with the Error messages.
   - A truth table showing the expected behavior if the code is correct.
3. If you need to start over, click the "Reset" button to shuffle the code blocks.

#### Verilog Syntax Reference

- For detailed Verilog syntax rules, refer to the [Verilog Syntax Guide](https://www.chipverify.com/verilog/verilog-syntax).
- For module and testbench examples, visit [ASIC World Verilog Tutorial](https://www.asic-world.com/verilog/veritut.html).

### 6. Troubleshooting

If you see error messages, carefully check:

- Module and testbench names follow the naming rules.
- Code blocks are in the correct order.
- All signal selections match the expected values.
- Port connections are properly defined.

Additional tips:

- Use the Reset button to start fresh if needed.
- Switch between register types to compare their differences.

#### Important Reminders

- Verilog is case-sensitive.
- All signals must be properly declared before use.
- Testbench signals must match the module ports.
- Code blocks must be in the correct order for the simulation to work.
