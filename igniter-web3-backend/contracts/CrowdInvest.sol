// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdInvest {
    // Structure of block is created, this is very important. As this order will be followed while pushing the data into blockchain.
    struct Project {
        address founder;
        string title;
        string description;
        uint256 goal;
        uint256 deadline;
        uint256 balance;
        string image;
        address[] investors;
        uint256[] investment;
    }

    // Project Struct is mapped to projects, so it can be accessible in this smart contract
    mapping(uint256 => Project) public projects;

    // This variable will maintain total count of project
    uint256 public projectCount = 0;

    // This function will create a block and push the data into blockchain.
    // This function can write into blockchain.
    function createProject(address _founder,
        string memory _title,
        string memory _description,
        uint256 _goal,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256){
        Project storage project = projects[projectCount];

        require(project.deadline < block.timestamp, "The deadline should be date in the future!");

        project.founder = _founder;
        project.title = _title;
        project.description = _description;
        project.goal = _goal;
        project.deadline = _deadline;
        project.image = _image;
        project.balance = 0;
        projectCount++;

        return projectCount;
    }

    // This function will be triggered when investor wants to make investment in any startup.
    // This function can write into blockchain.
    function investToProject(uint256 _id) public payable {
        uint256 amount = msg.value;
        Project storage project = projects[_id];

        project.investors.push(msg.sender);
        project.investment.push(amount);

        (bool sent,) = payable(project.founder).call{value: amount}("");

        if(sent){
            project.balance += amount;
        }
    }

    // This function will return list of investor of one partcular project using id.
    // This function is read only
    function getInvestors(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (projects[_id].investors, projects[_id].investment);
    }

    // This function will return all the project recored into our blockchain.
    function getProjects() public view returns (Project[] memory){
        Project[] memory result = new Project[](projectCount);

        for(uint i = 0; i < projectCount; i++){
            Project storage item = projects[i];
            result[i] = item;
        }

        return result;
    }
}