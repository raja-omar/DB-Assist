# Dev-AI-Assistant

## Developers Guide
### Setup
#### 1. Prerequisites
 1. [Install WSL](https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command).
    1. Open PowerShell or Windows Command Prompt in administrator mode by right-clicking and selecting "Run as administrator".
    2. Run: `wsl --install`. Follow the prompts to create a new linux user. 
    3. Restart your computer.  
 3. Install [Git Credentials Helper](https://github.com/git-ecosystem/git-credential-manager/blob/release/docs/install.md).
	- Is included as part of the git for windows install. 
 4. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/).
	1. Follow the usual installation instructions to install Docker Desktop. The installer should prompt you to turn on WSL 2 during installation. 
	2. Start Docker Desktop from the **Windows Start** menu.
	3. Inside the Docker Desktop app navigate to **Settings**.
	4. From the **General** tab, select **Use WSL 2 based engine**.
	5. Select **Apply & Restart**.
	6. When Docker Desktop restarts, go to **Settings** > **Resources** > **WSL Integration** and make sure Ubuntu is enabled. 
	7. Select **Apply & Restart**.

#### 2. Setup Git and Github Credentials 
1. Open a terminal window.
2. Run: `git credential-manager configure`
3. Run: `git credential-manager github login`
	- Login with the github account that has access to the repo.
4. Run: `git config --global user.email "You@email.com"`
5. Run: `git config --global user.name "Your Name"`


#### 3. Setup Dev Environment 
1. Open a new WSL terminal window. 
2. Run: `sudo apt update && sudo apt upgrade`
3. Run: `git config --global credential.helper "/mnt/c/Program\ Files/Git/mingw64/bin/git-credential-manager.exe"`
4. Run: `git clone https://github.com/ArcurveInterns/Dev-AI-Assistant.git`
5. Run: `cd Dev-AI-Assistant`
6. Run: `code .`
7. Open the command pallet (ctrl+shift+p) and run the command "Manage Unsafe Repositories". Mark the Dev-AI-Assistant repo as safe. 
8. Install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) for VSCode. 
9. Open the command pallet and run the "Reopen in Container" command.
      ![image](https://microsoft.github.io/vscode-remote-release/images/remote-command-palette.png)

	- You can also click on the Remote Indicator in the status bar.
  
      ![image](https://microsoft.github.io/vscode-remote-release/images/remote-dev-status-bar.png)
   
    - Or the popup that appears in the bottom right corner.
      
      ![image](https://github.com/user-attachments/assets/2ba4d4c7-b07b-4df6-9be9-2e1f6718c6db)
10. Wait for everything to install. This takes ~15 minutes. 
11. Create a .env file in the backend folder. Ask Sunny to send you the Keeper record for this. 

#### 4. Running the Application
1. Open the vscode terminal
2. Run: `just run-frontend` to run the frontend next.js project.
3. Open second vscode terminal.
4. Run: `just run-backend` to run the fastapi server.
5. Call the /setup endpoint at least once before calling other endpoints. 

### Adding python packages
This project now uses pipenv. Now we don't always have to remember to activate a virtual environment. 
To add a new package use `pipenv install <package>`

Occasionally pipenv takes an extremely long time to "lock" packages, especially the first time you open the container. Using Poetry or going back to venv are potential alternatives that might be worth investigating. 

**DO NOT USE** `pip install`. If you do the pipfile, which is where the dependencies are tracked, will not get updated!

### Justfile 
[just](https://github.com/casey/just) is a handy way to save and run project-specific commands. If you'd like to add a command, add it to the justfile. 


